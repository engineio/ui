# Switching a product from the npm package to a copy

engine-ui is a reference now, not a dependency. `@engineio/ui@0.11.0` is the
last npm release. The products pin `^0.10.0`, so they run 0.10.0. Both stay
installable, so nothing breaks before a product switches. This is the plan for switching. **Nothing here has been applied to
any repo yet.**

| | Imports of `@engineio/ui` | Mode |
| --- | --- | --- |
| studio `front/` | 225 files | workspace package |
| rgs `services/front/` | 48 files | workspace package |
| casino `front/` | 1 file | folder |

## Workspace package (studio, rgs)

The copy becomes a local workspace package that is still named `@engineio/ui`,
so **no import changes**. All 225 and 48 files keep resolving.

From the front-end workspace root, with engine-ui checked out beside the repo:

```bash
bun ../../engine-ui/scripts/copy-into.ts packages/engine-ui --package   # rgs: ../../../engine-ui
```

1. **Dependency.** Change `"@engineio/ui": "^0.10.0"` to `"workspace:*"` in
   every `package.json` that has it: studio has three (root, `packages/shared`,
   `apps/provider`) and rgs has three (root, `packages/shared`, `apps/landing`).
   Then run `bun install` and commit the lockfile.
2. **Stylesheet.** Keep `@import "@engineio/ui/styles";` and repoint the
   `@source` line from `node_modules/@engineio/ui/dist` to the copy, relative to
   each `app.css`. For `packages/shared/src/app.css` that is
   `@source "../../engine-ui/src";`. rgs has a second `app.css` in
   `apps/landing`.
3. **Dockerfile.** Both Dockerfiles copy each workspace `package.json` before
   `bun install --frozen-lockfile`. Add the new one, or the image build fails:

   ```dockerfile
   COPY packages/engine-ui/package.json packages/engine-ui/package.json
   ```

   The later `COPY . .` brings the source.
4. **Verify.** Run `bun run check` (in a copy of the tree, never on the host
   while the Tilt pod is up), a production build, and a screenshot of a dense
   page against the current one. The copy is the v0.10.0 components plus
   everything merged since, so expect the newer changes to show up: theming,
   brighter sub-text greys, and 16px reading text.

Tested on a scratch workspace built from the gallery. Every import stayed
`@engineio/ui`, and `svelte-check` and the build both passed.

## Folder (casino, or any new product)

```bash
bun ../engine-ui/scripts/copy-into.ts src/lib/engine-ui
bun add bits-ui clsx tailwind-merge tailwind-variants @lucide/svelte
```

- In `app.css`, replace `@import "@engineio/ui/styles";` and its `@source` line
  with `@import "./lib/engine-ui/styles/index.css";`. No `@source` is needed,
  because the copy is inside the source tree.
- Change the imports from `@engineio/ui…` to `$lib/engine-ui…`.
- Remove the `@engineio/ui` dependency.
- Casino's Fluke token bridge still overrides the tokens in its own `@theme`,
  unchanged.

## After the switch

- **The copy is the product's.** Fix and extend it in place. Prefer
  `tv({ extend })` beside it for product variants, so the copy stays diffable.
- **Picking up upstream changes.** `ENGINE-UI.md` in the copy records the
  engine-ui commit it matches. `git -C ../engine-ui diff <sha> HEAD -- src/lib`
  shows what to port. Bump the commit when done.
- **A fix worth sharing goes upstream too.** Make it in engine-ui, then port it
  to the other products the same way.

## Outside the product repos

- The knowledge repo's `engine-brand` and `front-conventions` skills describe
  consuming `@engineio/ui` from `node_modules`. Point them at
  `../engine-ui/AGENTS.md` and the copy model.
- Products' `CLAUDE.md` files that point at `node_modules/@engineio/ui/AGENTS.md`
  should point at `../engine-ui/AGENTS.md`.
- On npm, mark the package deprecated once no product installs it:
  `npm deprecate @engineio/ui "Copy from engineio/ui instead."`
