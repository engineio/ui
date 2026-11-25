import { readFileSync, readdirSync } from "node:fs"
import { join } from "node:path"

const styles = join(import.meta.dir, "../src/lib/styles")
const themesDir = join(styles, "themes")

const declarations = (css: string) =>
  new Map([...css.matchAll(/(--[a-z0-9-]+|color-scheme)\s*:\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]))

const tokens = readFileSync(join(styles, "tokens.css"), "utf8")
const defaults = declarations(tokens.slice(tokens.indexOf("@theme {"), tokens.indexOf("\n}\n", tokens.indexOf("@theme {"))))

const themes = readdirSync(themesDir)
  .filter((f) => f.endsWith(".css") && f !== "index.css")
  .map((file) => {
    const css = readFileSync(join(themesDir, file), "utf8")
    const selector = css.match(/\[data-theme~="([^"]+)"\]/)?.[1]
    return { file, selector, values: declarations(css.replace(/\/\*[\s\S]*?\*\//g, "")) }
  })

const canonical = themes.find((t) => t.selector === "engine-magenta")
if (!canonical) throw new Error("themes/engine-magenta.css is missing; it defines the contract")
const contract = [...canonical.values.keys()]

const hex = (v: string | undefined) => {
  const m = v?.match(/^#([0-9a-f]{6})$/i)
  if (!m) return undefined
  const n = parseInt(m[1], 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}
const luminance = (rgb: number[]) => {
  const [r, g, b] = rgb.map((c) => {
    const s = c / 255
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const ratio = (a: number[], b: number[]) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}
const tint = (colour: number[], page: number[], amount: number) =>
  colour.map((c, i) => Math.round(c * amount + page[i] * (1 - amount)))

const pairs: [string, string, number, string][] = [
  ["foreground", "background", 7, "body text"],
  ["card-foreground", "card", 7, "text on a card"],
  ["popover-foreground", "popover", 7, "text in a popover"],
  ["muted-foreground", "background", 4.5, "secondary text"],
  ["muted-foreground", "card", 4.5, "secondary text on a card"],
  ["grey-300", "background", 4.5, "grey-300 text"],
  ["grey-300", "card", 4.5, "grey-300 text on a card"],
  ["grey-400", "grey-850", 4.5, "placeholder in a field"],
  ["primary", "background", 3, "magenta text (15px bold and up)"],
  ["primary-foreground", "primary", 3, "label on a magenta fill (15px bold and up)"],
  ["primary-300", "primary-tint-12", 4.5, "ink on a magenta tint"],
  ...(["success", "warning", "danger"] as const).flatMap((s): [string, string, number, string][] => [
    [s, "background", 4.5, `${s} text`],
    [s, `${s}-tint-12`, 4.5, `${s} text on its tint`],
    [`${s}-foreground`, s, 4.5, `ink on a ${s} fill`],
  ]),
]

let failed = false
const fail = (msg: string) => {
  failed = true
  console.log(`  FAIL ${msg}`)
}

for (const theme of themes) {
  console.log(`\n${theme.file}  [data-theme~="${theme.selector}"]`)
  if (!theme.selector) fail("no [data-theme~=\"…\"] selector")
  const full = theme.values.has("color-scheme")
  if (!full) console.log("  overlay theme (no color-scheme): only its own tokens are checked")

  for (const name of theme.values.keys())
    if (!contract.includes(name) && !name.startsWith("--color-") && !name.startsWith("--shadow-"))
      fail(`${name} is not a theme token`)

  if (full) for (const name of contract) if (!theme.values.has(name)) fail(`missing ${name}`)

  if (theme === canonical)
    for (const [name, value] of theme.values)
      if (defaults.has(name) && defaults.get(name) !== value)
        fail(`${name} is ${value} here but ${defaults.get(name)} in tokens.css`)

  if (!full) continue
  const get = (name: string) => {
    const page = hex(theme.values.get("--color-background"))!
    const m = name.match(/^(.*)-tint-12$/)
    if (m) {
      const base = hex(theme.values.get(`--color-${m[1]}`))
      return base && tint(base, page, 0.12)
    }
    return hex(theme.values.get(`--color-${name}`))
  }
  for (const [fg, bg, min, label] of pairs) {
    const a = get(fg)
    const b = get(bg)
    if (!a || !b) {
      console.log(`  skip ${label}: ${fg} on ${bg} is not a plain hex`)
      continue
    }
    const r = ratio(a, b)
    const line = `${r.toFixed(2).padStart(5)}:1  ${label} (${fg} on ${bg}, needs ${min})`
    if (r < min) fail(line)
    else console.log(`  ok   ${line}`)
  }
}

if (failed) {
  console.log("\nthemes: failed")
  process.exit(1)
}
console.log("\nthemes: clean")
