import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { execFileSync } from "node:child_process"

const repo = resolve(import.meta.dir, "..")
const args = process.argv.slice(2)
const asPackage = args.includes("--package")
const target = args.find((a) => !a.startsWith("--"))
const dest = target && resolve(process.cwd(), target)

if (!dest) {
  console.error(`usage: bun ../engine-ui/scripts/copy-into.ts <destination> [--package]

  <destination>            a folder in your source tree, e.g. src/lib/engine-ui
  <destination> --package  a workspace package named @engineio/ui, e.g.
                           packages/engine-ui, so existing "@engineio/ui"
                           imports keep resolving`)
  process.exit(1)
}

const git = (...a: string[]) => execFileSync("git", ["-C", repo, ...a], { encoding: "utf8" }).trim()
const sha = git("rev-parse", "HEAD")
const dirty = git("status", "--porcelain", "--", "src/lib") !== ""
const lib = asPackage ? join(dest, "src") : dest
const here = (p: string) => relative(process.cwd(), p) || "."

if (existsSync(join(dest, "ENGINE-UI.md"))) {
  const from = (await Bun.file(join(dest, "ENGINE-UI.md")).text()).match(/engineio\/ui@([0-9a-f]{40})/)?.[1]
  console.error(`${here(dest)} is already a copy${from ? ` of ${from.slice(0, 7)}` : ""}, and it is yours now.`)
  console.error("Port what changed upstream instead of overwriting it:")
  if (from) console.error(`  git -C ${here(repo)} diff ${from.slice(0, 7)} HEAD -- src/lib`)
  process.exit(1)
}

mkdirSync(lib, { recursive: true })
cpSync(join(repo, "src/lib"), lib, { recursive: true })

if (asPackage) {
  const upstream = await Bun.file(join(repo, "package.json")).json()
  const module = (p: string) => ({ types: p, svelte: p, default: p })
  writeFileSync(
    join(dest, "package.json"),
    JSON.stringify(
      {
        name: "@engineio/ui",
        private: true,
        type: "module",
        sideEffects: ["**/*.css"],
        svelte: "./src/index.ts",
        exports: {
          ".": module("./src/index.ts"),
          "./styles": "./src/styles/index.css",
          "./styles/themes": "./src/styles/themes/index.css",
          "./styles/themes/*": "./src/styles/themes/*.css",
          "./styles/*": "./src/styles/*.css",
          "./utils": module("./src/utils.ts"),
          "./components/ui/*": module("./src/components/ui/*/index.ts"),
          "./components/ui/*/index.js": module("./src/components/ui/*/index.ts"),
          "./components/brand": module("./src/components/brand/index.ts"),
          "./components/brand/index.js": module("./src/components/brand/index.ts"),
          "./components/marketing": module("./src/components/marketing/index.ts"),
          "./components/marketing/index.js": module("./src/components/marketing/index.ts"),
        },
        dependencies: upstream.dependencies,
        peerDependencies: upstream.peerDependencies,
      },
      null,
      2,
    ) + "\n",
  )
}

writeFileSync(
  join(dest, "ENGINE-UI.md"),
  `Copied from engineio/ui@${sha}${dirty ? " (with uncommitted changes)" : ""} on ${new Date().toISOString().slice(0, 10)}.

This is a copy of the Engine design system, and this repo owns it. Edit it
freely. The rules it follows are in engineio/ui's AGENTS.md
(https://engineio.github.io/ui/AGENTS.md), and the gallery shows every part
rendered: https://engineio.github.io/ui

To see what changed upstream since this copy, and port what you want:

    git -C ../engine-ui diff ${sha.slice(0, 7)} HEAD -- src/lib

Update the commit above when you have ported up to a newer one.
`,
)

console.log(`copied engine-ui ${sha.slice(0, 7)} into ${here(dest)}${asPackage ? " as the @engineio/ui workspace package" : ""}`)
console.log(
  asPackage
    ? `
Next:
  1. Point the dependency at it:  "@engineio/ui": "workspace:*"  and run bun install.
  2. In app.css keep  @import "@engineio/ui/styles";  and change the @source line
     to the copy's source, relative to app.css:
       @source "<path to ${here(dest)}>/src";
  3. Imports stay as they are.`
    : `
Next:
  1. In app.css, after @import "tailwindcss":
       @import "<path to ${here(lib)}>/styles/index.css";
     No @source line: the copy is inside your source tree, so Tailwind scans it.
  2. Install what the components import:
       bun add bits-ui clsx tailwind-merge tailwind-variants @lucide/svelte
  3. Import from the copy, e.g. "$lib/engine-ui/index.js".`,
)
