# Adopting @engineio/ui in engine and rgs

Consumer-side changes, in the order they need to happen. Nothing here has been
applied to either repo — this is the plan, not a record.

Both consumers are SvelteKit apps in a bun workspace behind a docker-bake build,
so the shape is the same for each:

| | engine | rgs |
| --- | --- | --- |
| Workspace root | `front/` | `services/front/` |
| Apps | `apps/provider` | `apps/operator`, `apps/admin` |
| Dockerfile | `front/Dockerfile` | `deploy/front/Dockerfile` |
| Bake file | `deploy/studio-front/docker-bake.hcl` | `deploy/front/docker-bake.hcl` |
| Stylesheet | `front/packages/shared/src/app.css` | same path under `services/front` |

---

## 1. Registry access

`@engineio/ui` is private and org-scoped, so every place that runs
`bun install` needs a credential. Four places do.

**Local dev.** Each developer needs a **classic** PAT with `read:packages`, in
`~/.npmrc` (not the repo — never commit a token):

```
@engineio:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ghp_xxxxxxxx
```

It has to be a classic token. GitHub Packages' npm registry does not accept
fine-grained PATs, and the failure looks identical to a wrong token, so this is
the usual reason access stays broken after someone has "added a token".

Add a repo-level `.npmrc` with **only** the registry line:

```
@engineio:registry=https://npm.pkg.github.com
```

Do not put an auth line in the repo `.npmrc`, not even as a
`${NODE_AUTH_TOKEN}` placeholder. npm expands it, it is unset outside CI, and
the empty result overrides the real token in `~/.npmrc` — so every developer
gets `E401 unauthenticated` while holding a perfectly good credential. (This
happened in the design system repo; that is why its `.npmrc` carries the
registry line and nothing else.) CI does not need it either: `setup-node`
writes its own authenticated user config from `NODE_AUTH_TOKEN`.

**Check access before going further**, because everything below assumes it:

```
npm view @engineio/ui --registry=https://npm.pkg.github.com
```

`E401` means no token reached the registry — check `~/.npmrc` and that no
project `.npmrc` is shadowing it. `E403 does not match expected scopes` means
the token arrived but lacks `read:packages`, or is fine-grained.

**CI.** `GITHUB_TOKEN` can read packages in the same org — add the permission to
any job that installs:

```yaml
permissions:
  contents: read
  packages: read
```

then before install:

```yaml
- run: echo "//npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}" >> .npmrc
```

**The Docker build.** This is the fiddly one, because the install happens inside
buildx. In the Dockerfile, mount the credential as a secret rather than baking it
into a layer:

```diff
 COPY package.json bun.lock turbo.json ./
 COPY apps/provider/package.json apps/provider/package.json
 COPY packages/shared/package.json packages/shared/package.json
-RUN bun install --frozen-lockfile
+RUN --mount=type=secret,id=npmrc,target=/root/.npmrc,required=true \
+    bun install --frozen-lockfile
```

The builder stage runs as root, so `/root/.npmrc` is on bun's search path. A
secret mount leaves nothing in the image.

In the bake target:

```diff
 target "studio-front-front" {
   context    = "./front"
   dockerfile = "Dockerfile"
   network    = "host"
+  secret     = ["id=npmrc,env=NPMRC"]
 }
```

and in the conveyor and release workflows, export `NPMRC` before `bake`:

```yaml
env:
  NPMRC: |
    @engineio:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=${{ secrets.GITHUB_TOKEN }}
```

Note the front bake target already sets `network = "host"`, which is what lets
bun reach an external registry at all from the microVM builders — that
entitlement is why this works without further network plumbing.

**Watch for:** `--frozen-lockfile` fails if `bun.lock` predates the dependency.
Run `bun install` locally and commit the lockfile in the same PR.

## 2. Install and wire the stylesheet

```bash
cd front && bun add @engineio/ui
```

Then in `packages/shared/src/app.css` — and this is the step that matters most,
because the package and the existing file both define the same tokens:

```diff
 @import "./fonts.css";
 @import "tailwindcss";
+@import "@engineio/ui/styles";
+@source "../../../node_modules/@engineio/ui/dist";
 @import "tw-animate-css";
```

Then **delete** from `app.css`:

- the entire `@theme { … }` block — colours, greys, radii, shadows, easings. It
  now comes from the package, and two `@theme` blocks defining
  `--color-primary` differently is a coin flip.
- `@utility field { … }` — shipped in `styles/utilities.css`.
- the `color-scheme`, scrollbar and `.scrollbar-hide` rules — same.
- the `@import "./fonts.css"` line, once you delete `fonts.css` and the seven
  `.otf` files in `static/fonts/` (the package references its own by relative
  path). Keep `LeagueGothic*` if a product still uses it.

Keep in `app.css`: `--gradient-brand*`, the `@keyframes`, `.floating`,
`.markdown-body`, the `input[aria-hidden]` fix, `carta.css` and
`container.css` — product-specific, not brand.

`@source` resolves relative to the CSS file that declares it. From
`front/packages/shared/src/app.css` the workspace `node_modules` is three levels
up (`src` → `shared` → `packages` → `front`); rgs is the same depth under
`services/front`. Get it wrong and everything renders unstyled with no error, so
check it before wondering why the tokens did not land.

**Two visible changes** you should expect from the token layer, both deliberate:
Proxima Nova Semibold now maps to weight 600 rather than 500, so
`font-semibold` labels will render in the correct cut for the first time; and
`--color-destructive` becomes the real danger red `#FF3B30` rather than the
oklch value inherited from shadcn, which had no brand owner.

## 3. Migrate imports, one component at a time

Both repos alias `$lib` to the shared package via `kit.files.lib`, so this is a
find-and-replace with no config change:

```diff
-import { Button } from "$lib/components/ui/button/index.js"
+import { Button } from "@engineio/ui"
```

Do it per component, not in one sweep, and delete
`packages/shared/src/lib/components/ui/<name>/` only once nothing imports it.
The 35 primitives that are not in the package stay exactly where they are —
`@engineio/ui` and the local `ui/` folder coexist fine.

**Where you will hit friction — Button.** The package drops `tab`,
`tab-active`, `drawer`, `play` and `filled`. Provider has 100+ button call
sites, some on those variants. Extend rather than fork — see the recipe in the
README — and put the extension in `$lib/components/ui/button-variants.ts`. Its
`success` variant does survive, now on the real status token rather than the
stock green it used to be.

**Badge is a restyle, not a migration.** Badge and Tag are merged into one
soft chip under the name `Badge`, and every variant provider actually uses —
`default` (9 sites), `secondary` (11), `outline` (11), `success` (3),
`destructive` (2) — survives with the same name. Nothing needs renaming.

What changes is how they look. The chip goes soft: `default` becomes a magenta
tint with `primary-300` ink instead of a solid magenta fill with white text,
`secondary` becomes a translucent wash instead of an opaque grey, and the size
goes from 11px to 13px. There is no `solid` variant, because an opaque fill can
only be correct on one surface. Expect to eyeball the 35 call sites rather than
edit them, and note the change fixes a real defect: the old solid badge's
white-on-magenta at 11px measured 3.9:1.

`Tag` is gone entirely. Neither repo has a single `<Tag>` call site, so this
costs nothing.

There is now a **status palette** — success, warning and danger — which is what
lets `destructive` resolve to a real red instead of to magenta. If a product
has been faking status colours with stock Tailwind hues (there are ~724
off-palette utility usages in the engine repo), those are now replaceable with
real tokens. That is a good second pass, not part of this migration.

(Class names are written descriptively rather than literally throughout this
file on purpose. Tailwind 4's automatic source detection scans markdown as
well as source, so a literal utility mentioned in prose gets generated into
the package's CSS — which is how two unused green custom properties ended up
shipping in the first build.)

## 4. rgs needs its peer dependencies

rgs's `services/front/package.json` is missing `bits-ui` and
`tailwind-variants`, which nearly every primitive imports. They are regular
dependencies of `@engineio/ui`, so `bun add @engineio/ui` pulls them in — no
action needed, but that is why the install is larger than it looks.

The operator app's 461 hand-written `.ig-*` selectors in
`lib/styles/integration.css` are the real prize here: most of them reimplement
Button, Card, Pill, Field and Modal because rgs never had access to the
primitives. Porting them is a separate, larger piece of work and should not be
bundled into this migration.

## 5. Drift warning, optional

A check that tells you when a consumer has fallen behind, without failing
anyone's build:

```yaml
- name: Design system freshness
  continue-on-error: true
  run: |
    have=$(node -p "require('./front/node_modules/@engineio/ui/package.json').version")
    want=$(gh api /orgs/engineio/packages/npm/ui/versions --jq '.[0].name' 2>/dev/null || echo "$have")
    [ "$have" = "$want" ] || echo "::warning::@engineio/ui $have installed, $want available"
```

Warn, never fail. Nothing about this setup should be able to block a product
release on a design system upgrade.

## Suggested order

Ship §1 and §2 alone first — registry access plus the token swap, no component
changes. That is the highest-value, lowest-risk half: it puts both products on
one set of tokens and fixes the Semibold mapping. Then migrate components at
whatever pace suits, and treat the `.ig-*` port as its own project.
