# Engine design system

The Engine design system: tokens, themes, the brand face, and twenty Svelte
primitives. **This repo is a reference, not a dependency.** Products copy what
they need into their own source tree and own the copy, the way the knowledge
repo's rules are read rather than installed. Nothing is published to npm.

Gallery: <https://engineio.github.io/ui>. Rules for agents:
<https://engineio.github.io/ui/AGENTS.md>.

## Using it in a product

With engine-ui checked out beside the product (the usual sibling layout), from
the product's front-end workspace:

```bash
bun ../engine-ui/scripts/copy-into.ts packages/shared/src/lib/engine-ui
bun add bits-ui clsx tailwind-merge tailwind-variants @lucide/svelte
```

That copies `src/lib` and writes `ENGINE-UI.md` beside it, recording the commit
it came from. Every import inside `src/lib` is relative, so the folder works
wherever it lands.

```css
/* app.css */
@import "tailwindcss";
@import "./lib/engine-ui/styles/index.css";
```

```svelte
<script>
  import { Button, Card, CardHeader, CardTitle } from "$lib/engine-ui/index.js"
</script>

<Card>
  <CardHeader><CardTitle>Accelerate Growth.</CardTitle></CardHeader>
  <Button>Publish Game</Button>
</Card>
```

There is no `@source` line, which the npm package needed. The copy is inside
your source tree, so Tailwind scans it like any other file.

**Picking up later changes.** The copy is yours, so the script won't overwrite
it. Run it again and it prints the command to diff upstream since your copy:

```bash
git -C ../engine-ui diff <copied-sha> HEAD -- src/lib
```

Port what you want, then bump the commit in `ENGINE-UI.md`. Copying a single
component works the same way: take its folder from `src/lib/components/` and
`utils.ts` if you don't have it yet.

---

## What this is, and what it is not

This package owns **brand rules**: colour, type, shape, motion, focus, and the
twenty primitives that carry them. Change it when the brand changes.

It does not own **product behaviour**. Engine Studio's approval queue, rgs's
operator picker, a `play` button variant — those live in the products. The
package is deliberately small so it can stay stable.

Products are **never auto-upgraded**. A change here reaches a product when
someone ports it into that product's copy, as a reviewable diff on the product's
own schedule. That's the same property the npm package had, without a release
or a version bump in between.

## Extending a component

The copy is yours, so you *can* edit a component in place. Prefer extending
its exported variant map instead, which keeps your copy diffable against
upstream when you port the next change:

```ts
// $lib/components/ui/button-variants.ts, beside your copy
import { buttonVariants } from "$lib/engine-ui/index.js"
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

Brand rules (shape, weight, motion, focus ring) come from the copy. Product
variants stay beside it. If you find yourself wanting to upstream a variant
that only one product uses, that is the signal to extend instead.

`buttonVariants`, `badgeVariants` and `alertVariants` are all exported for
this. Every primitive also passes `class` through `cn`, so
`<Button class="w-full" />` works without `!important`.

## What ships

**Tokens** — `styles/tokens.css` as a Tailwind 4 `@theme` block. Three brand
colours, three status colours, a twelve-step neutral ramp, radii by role, two
shadows, three easings, and the marketing page's column, rhythm and type ramp.

**Themes**: `styles/themes/`. Engine Magenta (dark, the default) and Engine
Magenta Light, selected with `data-theme` on `<html>` or on any subtree. With no
attribute set, a page renders exactly as before. Components name roles, not
colours, so a theme is one CSS rule. To add a theme, copy a file, change the
values and run `bun run check:themes`, which checks completeness and AA
contrast. See [`src/lib/styles/themes/README.md`](src/lib/styles/themes/README.md).

**The brand face, named** — `--font-brand` is DM Sans, a variable Google
Font. No binary ships here: put Google's stylesheet link in your `app.html`
and the role resolves to it, with a metric-matched local fallback
(`styles/fonts.css`) behind it. `--font-condensed`, `--font-extra-condensed`
and `--font-mono` are roles that resolve to the brand face until a product
binds them. See "Loading the brand face" below — the link is a required step
and skipping it fails quietly.

**Marks** — `EngineWordmark` and `EngineIcon`, vector, in the two sanctioned
colourways (`variant="primary"` white, `variant="secondary"` Off Black). Size
by height alone. The wordmark is artwork, not type — with the vector in the
package there is no reason to typeset "engine" in the brand face again.
`EngineIcon` is the turbo; the wordmark's g is retired as a standalone mark, so
a product still shipping its own `engine-icon.svg` cut from the g is showing
the old brand.

### Loading the brand face

The system names DM Sans in `--font-brand`. You load it, once, in `app.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
```

and the stylesheet stays three lines:

```css
@import "tailwindcss";
@import "./lib/engine-ui/styles/index.css";
```

No `@font-face`, no `@theme` override, no binaries in `static/fonts/`. Google
serves the variable face (weight 100-1000, optical size 9-40) as per-script
woff2 subsets, so every weight a product asks for is a real instance and the
old weight-range folding is gone. Behind it the package ships
`"DM Sans Fallback"` — three `local()` faces, Helvetica Neue or Arial
size-adjusted to DM Sans's width — so a slow or blocked fetch reflows
nothing when the real face lands. `styles/fonts.css` has the numbers.

Google's CSS is `font-display: swap`. If your app covers first paint with a
loader, wait on `document.fonts.load('400 1rem "DM Sans"')` under a cap
before lifting it, or the fallback paints and then visibly swaps. Both Engine
products do this in `app.html`.

A product on another brand overrides the role in its own `@theme`, as the
casino does:

```css
@theme {
  --font-brand: "YourFace", "Helvetica Neue", Arial, sans-serif;
}
```

**Like `@source`, the link fails silently.** The tokens resolve either way, so
a repo that skips it renders in the fallback with no error. Generic-looking
type is the symptom.

**Primitives** — Alert, Badge, Button, Card, Checkbox, Dialog, Input, Label,
Popover, Progress, RadioGroup, Select, Separator, Skeleton, Switch, Table, Tabs,
Textarea, Tooltip.

**Marketing kit** — the landing-page formula the two Engine landings settled
on, as components and tokens: `SiteBanner`, `SiteHeader`, `Hero`, `Marquee`,
`SectionHead`, `Tour`, `BentoGrid` / `BentoCard`, `StatBand`, `SiteFooter`,
with the `inView` attachment and `prefersReducedMotion()`. The 1180px column,
fluid gutter and section rhythm, the four-size type ramp (`text-hero`,
`text-section`, `text-standfirst`, `text-lead`, `text-small`) and the glass
header are tokens; the motion grammar (`rise`, `sweep`, `settle`, `swap-in` /
`swap-out`, `live-dot`, `reveal`, `motion-gate`) is `styles/marketing.css`,
imported by `@engineio/ui/styles`. `AGENTS.md` has the formula and the rules
behind each number.

Badge and Tag were merged into one chip. There is no `Tag`: the soft
repository-label treatment it carried is now what `Badge` looks like, and the
name `Badge` survived because it is the one in use — 35 call sites in the engine
repo, against zero for `Tag`.

Deliberately excluded: `form`, `data-table`, `drawer`, `resizable`, `carousel`
and `chart` — heavy dependencies and product-specific APIs. Copy those from the
engine repo into your product if you need them. `sonner` was excluded because
toasts need success and error colours that did not exist; now that they do, it
is a candidate for the next release.

## Using it with AI agents

The rules live in [`AGENTS.md`](AGENTS.md), also served at
<https://engineio.github.io/ui/AGENTS.md>. Point a product's `CLAUDE.md` at
that, not at a copy of the rules, because a copy goes stale silently:

```md
UI follows the Engine design system. Before writing or reviewing UI, read
../engine-ui/AGENTS.md (or https://engineio.github.io/ui/AGENTS.md). Our copy
of the components is in packages/shared/src/lib/engine-ui; ENGINE-UI.md there
says which upstream commit it matches.
```

The knowledge repo's `engine-brand` and `front-conventions` skills carry the
same pointer, so an agent in any Engine repo reaches these rules without
anything installed. `.claude/skills/engine-design-system` in this repo is the
same pointer as a standalone skill, for a repo outside the platform.

## Development

The gallery is published at https://engineio.github.io/ui/ on every push to
`main`, built on the marketing formula it documents, with the agent reference
served alongside it at https://engineio.github.io/ui/AGENTS.md.

```bash
bun install
bun run dev            # the gallery, on :3100
bun run check          # svelte-check
bun run build          # svelte-package -> dist, then publint (proves src/lib builds alone)
bun run check:themes   # every theme complete and AA-readable
bun run build:gallery  # the gallery -> build/
```

CI enforces what review forgets: no raw hex literals, no Tailwind stock palette,
no retired sub-brand colours, no emoji. Those four checks exist because all four
happened in the products.

## Releasing

There are no releases. Merging to `main` publishes the reference: the gallery
and `AGENTS.md` redeploy, and the next product to port picks the change up.
Commit messages still follow conventional commits so a product porting a range
can read what changed from `git log`.

The npm package `@engineio/ui` stops at 0.10.0. It stays installable for the
products still on it until they switch to copies (see `MIGRATION.md`), but no
newer version will be published.

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
   colour as text on both the page and its own 12% tint. Ink on a status
   fill is its `-foreground` token. On Engine Magenta that is Off Black, because
   white fails on all three; the light theme's deeper steps take white.

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

4. **No mono face.** JetBrains Mono is retired at the owner's direction and
   `--font-mono` resolves to the brand face, so `font-mono` is not monospaced.
   Set the token yourself if a surface genuinely needs character-cell
   alignment. ENGINE-BRAND.md and ENGINE-DESIGN-SYSTEM.md still name JetBrains
   Mono and need updating.

5. **No binary ships with this package, and it no longer needs to.** Proxima
   Nova used to. It is commercially licensed, and this package is MIT and
   published publicly to npm from a public repo — so the seven cuts were being
   handed to every reader of the registry under a licence nobody here can
   grant. Removing them did not unpublish them: they remain inside every 0.x
   tarball published before the DM Sans release and in this repo's git
   history, which is a separate call for whoever owns the licence. The brand
   face is now DM Sans, open and served by Google, so the package names it in
   the token and the question does not come back.

6. **Engine Integration's accent is unsettled.** Brand direction assigns it
   Partner Yellow; every shipped surface is magenta and was deliberately
   migrated there. `--color-partner-yellow` is declared and available; build
   Integration in magenta until the call is made. A half-migrated accent is
   worse than a consistent one.

7. **No vector sub-brand artwork.** The wordmark and the figure mark are
   vector and ship here. The 3x3 dot badges that precede a sub-brand name in a
   lockup are raster extractions at roughly 29px and go soft above 24px, so
   this package ships no `SubBrandLockup` at all. The originals are a
   brand-team ask.

8. **Layout and scrim tokens live only in the document.** `--space-*`,
   `--page-max`, `--content-max` and `--scrim-bottom` are specified in the
   design system document §2 and are not declared in `tokens.css`. Tailwind's
   own 4px scale already produces every spacing step (`p-14` is 56px, `p-32`
   is 128px), and the two page widths are carried as arbitrary values, so the
   numbers are reachable but unnamed. The gallery's imagery section sets the
   scrim inline for the same reason.

## Source of truth

`docs/brand/ENGINE-DESIGN-SYSTEM.md` in the engine repo is the written
specification, and `docs/brand/ENGINE-BRAND.md` the brand guidelines. Where this
repo and those documents disagree, **the documents win and this repo is
wrong** — open an issue rather than changing the document to match the code.
