# @engineio/ui

The Engine design system: tokens, the brand face, and twenty Svelte primitives,
published once and consumed by every Engine product.

Gallery — <https://engineio.github.io/ui>

```bash
bun add @engineio/ui
```

```css
/* app.css */
@import "tailwindcss";
@import "@engineio/ui/styles";
@source "../node_modules/@engineio/ui/dist";
```

```svelte
<script>
  import { Button, Card, CardHeader, CardTitle } from "@engineio/ui"
</script>

<Card>
  <CardHeader><CardTitle>Accelerate Growth.</CardTitle></CardHeader>
  <Button>Publish Game</Button>
</Card>
```

**That `@source` line is not optional.** Tailwind 4 does not scan
`node_modules`, so without it the utility classes the primitives are written
against never get generated. Adjust the relative path to wherever
`node_modules` sits from the importing stylesheet — it resolves relative to the
CSS file that declares it.

The failure mode is nastier than "nothing renders", which is why it is worth
getting right first time: the tokens still land (they are plain custom property
declarations), and any class that *also* appears somewhere in your own source
still works. So you get a page that is half-styled — magenta fills present,
`rounded-control` and `border-grey-600` missing — which reads like a component
bug rather than a build-config one. In a test consumer, omitting the line took
the stylesheet from 30KB to 6KB with no error at all.

---

## What this is, and what it is not

This package owns **brand rules**: colour, type, shape, motion, focus, and the
twenty primitives that carry them. Change it when the brand changes.

It does not own **product behaviour**. Engine Studio's approval queue, rgs's
operator picker, a `play` button variant — those live in the products. The
package is deliberately small so it can stay stable.

Consumers are **never auto-upgraded**. Cutting a release only makes a version
available; engine and rgs pick it up when someone bumps the dependency and opens
a PR. That is the point of publishing rather than sharing source — the upgrade
is a reviewable diff on the consumer's own schedule.

## Extending a component

Every variant map is exported. Add product variants without forking the
component or waiting on a release here:

```ts
// $lib/components/ui/button-variants.ts — in YOUR repo
import { buttonVariants } from "@engineio/ui"
import { tv } from "tailwind-variants"

export const appButtonVariants = tv({
  extend: buttonVariants,
  variants: {
    variant: {
      tab: "bg-transparent text-grey-300 hover:bg-white/6 hover:text-foreground",
      play: "bg-primary text-primary-foreground hover:bg-primary-press",
    },
  },
})
```

Brand rules (shape, weight, motion, focus ring) come from the package. Product
variants stay in the product. If you find yourself wanting to upstream a variant
that only one product uses, that is the signal to extend instead.

`buttonVariants`, `badgeVariants` and `alertVariants` are all exported for
this. Every primitive also passes `class` through `cn`, so
`<Button class="w-full" />` works without `!important`.

## What ships

**Tokens** — `styles/tokens.css` as a Tailwind 4 `@theme` block. Three brand
colours, three status colours, a twelve-step neutral ramp, radii by role, two
shadows, three easings.

**The brand face** — Proxima Nova, seven cuts, referenced by relative path so
your bundler fingerprints them out of `node_modules`. You do not need a copy in
`static/fonts`.

**Marks** — `EngineWordmark` and `EngineIcon`, vector, in the two sanctioned
colourways (`variant="primary"` white, `variant="secondary"` Off Black). Size
by height alone. The wordmark is artwork, not type — with the vector in the
package there is no reason to typeset "engine" in Proxima Nova again.

**Primitives** — Alert, Badge, Button, Card, Checkbox, Dialog, Input, Label,
Popover, Progress, RadioGroup, Select, Separator, Skeleton, Switch, Table, Tabs,
Textarea, Tooltip.

Badge and Tag were merged into one chip. There is no `Tag`: the soft
repository-label treatment it carried is now what `Badge` looks like, and the
name `Badge` survived because it is the one in use — 35 call sites in the engine
repo, against zero for `Tag`.

Deliberately excluded: `form`, `data-table`, `drawer`, `resizable`, `carousel`
and `chart` — heavy dependencies and product-specific APIs. Copy those from the
engine repo into your product if you need them. `sonner` was excluded because
toasts need success and error colours that did not exist; now that they do, it
is a candidate for the next release.

## Development

```bash
bun install
bun run dev            # the gallery, on :3100
bun run check          # svelte-check
bun run build          # svelte-package -> dist, then publint
bun run build:gallery  # the gallery -> build/
```

CI enforces what review forgets: no raw hex literals, no Tailwind stock palette,
no retired sub-brand colours, no emoji. Those four checks exist because all four
happened in the products.

## Releasing

**Every push to `main` releases.** semantic-release reads the conventional
commits since the last tag, works out the version, tags it, writes the GitHub
release notes and publishes to GitHub Packages — one run, no release PR, no
approval step. A push with nothing releasable in it (`docs:`, `chore:`, `ci:`)
is a no-op rather than a failure.

| Commit type | Bump |
| --- | --- |
| `feat:`, `tokens:` | minor |
| `fix:`, `perf:`, `style:`, `refactor:` | patch |
| `docs:`, `test:`, `build:`, `ci:`, `chore:` | none |
| any `!` / `BREAKING CHANGE:` | minor, while under 1.0.0 |

Use `tokens:` for token changes so they land in their own release-notes
section.

**Two things are deliberately not tracked in git.** `package.json`'s version is
the placeholder `0.0.0-development` — tags are the source of truth, and
semantic-release writes the real version in the runner just before publishing.
And there is no `CHANGELOG.md`; the release notes are the changelog, generated
from the same commits. Both follow from `main` requiring pull requests: the
usual setup commits the bump and changelog back to the release branch, which
would need a bypass no CI job should hold.

We are on `0.x` on purpose. Semver means something the moment two repos depend
on you, and the token layer is still moving — breaking changes are cheap and
expected until it settles. That is enforced by `breaking → minor` in
`.releaserc.json`; deleting that rule is the deliberate act that cuts `1.0.0`
and starts the promises.

## Known gaps

Stated rather than designed around. Most are inherited from the brand; the
first is a decision made here that the brand documents have not caught up with.

1. **The status palette is a local decision the brand documents do not yet
   know about.** Success `#00C46A`, warning `#FFB020` and danger `#FF3B30` now
   exist in `tokens.css`, commissioned at the repo owner's direction to close
   what was previously this list's worst gap. `--color-destructive` aliases
   danger, so Alert, the Button's destructive variant and Input's
   `aria-invalid` state all resolve to a real red instead of to magenta.

   Every value clears 4.5:1 three ways — Off Black as ink on the fill, and the
   colour as text on both the page and its own 12% tint. **Ink on a status
   fill is always Off Black**; white fails on all three.

   The outstanding work is documentary, not technical: `ENGINE-BRAND.md` §10
   and `ENGINE-DESIGN-SYSTEM.md` §12 in the engine repo still state that no
   status palette exists and that one must not be invented. Those sections
   need updating and the values want brand-team ratification. Until that
   happens, this package and the brand documents disagree — and by this repo's
   own rule (see Source of truth) the documents win, so treat these three as
   provisional.

   One judgement call inside the palette: warning sits ΔE 28.7 from Partner
   Yellow `#FFDD00` — visibly amber beside that pure yellow, but not
   dramatically. It does not matter while Partner Yellow is unused; if Engine
   Integration adopts it, a warning chip next to a Partner badge on one surface
   wants another look. And there is deliberately **no `info` colour**: the
   obvious choice is a blue, and any blue would read as the retired Sportsbook
   Blue returning. Use the neutral ramp for informational states.

2. **Still no categorical palette.** `Badge` ships the soft repository-label
   treatment — tinted fill, matching ink — in eight variants, four of which are
   the functional status colours. A *categorical* palette (one hue per topic,
   twenty of them) is a separate and still-unmade decision: eighteen accents on
   one surface is the direct opposite of "one accent per surface, never two".
   Do not press the status colours into that job — using `success` to mean
   "slots" because green looked right spends the only signal the palette
   carries. If a categorical palette is granted, declare it here once as a
   named group rather than as one-off fills discovered in a diff later.

3. **Two deliberate deviations from the brand document**, both at the repo
   owner's direction, both leaving the code and the document in disagreement.

   **Badge is one component where §6 specifies two.** The document defines
   Badge and Tag separately, Badge as a filled pill with white ink. This
   package ships a single soft chip, because the two-component rule only ever
   generated arguments about which a given label was. It does resolve a
   contradiction that used to sit in this list: the filled badge's
   white-on-magenta at 11px measured 3.9:1, a documented AA failure, against
   5.81:1 for the soft chip's `primary-300` ink on a magenta tint.

   **Alert signals state with a coloured left-edge bar**, which the brand
   prohibits — twice. Worth reading the wording precisely, because it is
   narrower than it first looks: ENGINE-BRAND.md §2 bans "a coloured left-edge
   accent **to signal which sub-brand a card belongs to**", and
   ENGINE-DESIGN-SYSTEM.md §11 bans "a coloured left border **to indicate
   category or ownership**". Both scope the prohibition to signalling
   identity, and both give the same reason: the lockup does that job. A status
   bar signals state, which no lockup can express. That is the reading this is
   built on — a reading, not an exemption.

   Either way, §6 and §11 need updating or these need reverting, and by this
   repo's own source-of-truth rule the document nominally wins.

4. **JetBrains Mono is not loaded.** The brand specifies it for all numerics,
   keys, IDs, code and eyebrow labels. Neither engine nor rgs has ever shipped
   the binary, so every monospace surface in both products renders in the
   platform default. `--font-mono` falls back safely, but the brand face is
   absent. It is OFL-licensed and free to redistribute: drop the `.woff2` files
   into `src/lib/fonts/` and add the `@font-face` blocks to `styles/fonts.css`.

5. **Proxima Nova is commercially licensed.** The seven cuts ship inside this
   package, which is private and org-scoped — the same internal distribution as
   the copies already sitting in engine's and rgs's `static/fonts`. Worth a
   glance from whoever owns the licence before this goes anywhere less private.
   Inter is the documented substitute where the licence does not reach.

6. **Engine Integration's accent is unsettled.** Brand direction assigns it
   Partner Yellow; every shipped surface is magenta and was deliberately
   migrated there. `--color-partner-yellow` is declared and available; build
   Integration in magenta until the call is made. A half-migrated accent is
   worse than a consistent one.

## Source of truth

`docs/brand/ENGINE-DESIGN-SYSTEM.md` in the engine repo is the written
specification, and `docs/brand/ENGINE-BRAND.md` the brand guidelines. Where this
package and those documents disagree, **the documents win and this package is
wrong** — open an issue rather than changing the document to match the code.
