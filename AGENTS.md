# Engine design system — agent reference

The Engine design system (engineio/ui). Read this file in the sibling checkout
(`../engine-ui/AGENTS.md`) or at https://engineio.github.io/ui/AGENTS.md. Point
at it rather than copying its contents into a repo, or the copy goes stale.

Authoritative source: `docs/brand/ENGINE-DESIGN-SYSTEM.md` and
`ENGINE-BRAND.md` in the `engineio/engine` repo. Where this file and those
disagree, **they win and this is a bug**.

## Setup

The components are a reference, not a dependency. Nothing is published to npm;
`@engineio/ui@0.10.0` is the last release and only the products that haven't
switched yet still install it. A product copies `src/lib` into its own tree
and owns the copy:

```bash
bun ../engine-ui/scripts/copy-into.ts packages/shared/src/lib/engine-ui
bun add bits-ui clsx tailwind-merge tailwind-variants @lucide/svelte
```

```css
@import "tailwindcss";
@import "./lib/engine-ui/styles/index.css";   /* relative to this CSS file */
```

No `@source` line: the copy is in the app's source tree, so Tailwind scans it.
`ENGINE-UI.md` in the copy records the upstream commit it matches. To pick up a
later change, diff upstream from that commit and port it:
`git -C ../engine-ui diff <sha> HEAD -- src/lib`. Running the copy script again
refuses to overwrite and prints that command.

Every import inside `src/lib` is relative. **Keep it that way:** a `$lib/`
import here resolves to the product's `$lib` once copied, and breaks.

## Importing

From wherever the product put its copy:

```svelte
import { Button, Card, CardHeader } from "$lib/engine-ui/index.js"
import { Button } from "$lib/engine-ui/components/ui/button/index.js"
import * as Card from "$lib/engine-ui/components/ui/card/index.js"
import { EngineWordmark } from "$lib/engine-ui/components/brand/index.js"
import { Tour, type TourStep } from "$lib/engine-ui/components/marketing/index.js"
```

Root barrel exports flat prefixed names (`CardHeader`). Subpath modules export
`Root`/`Header`/`Content`, so `import * as Card` works.

## Components

Alert, Badge, Button, Card, Checkbox, Dialog, Input, Label, Popover, Progress,
RadioGroup, ResponsiveDialog, Segmented, Select, Separator, Skeleton, Switch, Table, Tabs,
Textarea, Tooltip. Marks: `EngineWordmark`, `EngineIcon`. Marketing: `Hero`,
`SectionHead`, `SiteBanner`, `SiteHeader`, `SiteFooter`, `Marquee`, `Tour`,
`BentoGrid`, `BentoCard`, `StatBand`, plus the `inView` attachment and
`prefersReducedMotion()` — see "Marketing pages" below.

Not shipped, on purpose: `sonner`, `form`, `data-table`, `drawer`, `resizable`,
`carousel`, `chart`. Copy from the engine repo if needed. A standalone drawer is
not on that list because ResponsiveDialog covers what one was wanted for.

| Component | Variants |
| --- | --- |
| Button | `default` `inverse` `outline` `ghost` `secondary` `link` `icon` `destructive` `success`; sizes `sm` `default` `lg` `icon` `icon-sm` `icon-lg` |
| Badge | `default` `secondary` `outline` `partner` `success` `warning` `danger` `destructive` |
| Alert | `default` `success` `warning` `danger` `destructive`; optional `onDismiss` |
| Segmented | rail `Root` + `segmentVariants({ active })` for any trigger; `active` = white pill like the selected tab |
| Marks | `variant="primary"` (the page's ink: white on Engine Magenta) or `"secondary"` (the page colour) |

### ResponsiveDialog

One panel, three surfaces. Below 768px it is a bottom sheet; above it, a centred
modal, or an anchored popover with `desktop="popover"`. Reach for it whenever a
dialog has to survive a phone — a centred modal on a 390px viewport is the thing
it exists to stop.

```svelte
<ResponsiveDialog bind:open>
  <ResponsiveDialogTrigger>
    {#snippet child({ props })}<Button {...props}>Adjust limits</Button>{/snippet}
  </ResponsiveDialogTrigger>
  <ResponsiveDialogContent>
    <ResponsiveDialogHeader>
      <ResponsiveDialogTitle>Adjust limits.</ResponsiveDialogTitle>
      <ResponsiveDialogDescription>…</ResponsiveDialogDescription>
    </ResponsiveDialogHeader>
    …
    <ResponsiveDialogFooter>…</ResponsiveDialogFooter>
  </ResponsiveDialogContent>
</ResponsiveDialog>
```

| Root prop | |
| --- | --- |
| `open` | bindable; survives the swap when the viewport crosses over |
| `desktop` | `dialog` (default) or `popover` — what `auto` picks above the breakpoint |
| `mode` | `auto` (default), or pin to `sheet` / `dialog` / `popover` |
| `breakpoint` | px, default 768 |

Content takes `showClose` (defaults on, off for a popover), `swipeToClose`
(sheet only), `overlayClass`, and `align` / `side` / `sideOffset` for the
popover. `ResponsiveDialogFooter` is the part that earns its keep: stacked
full-width actions on the sheet, a right-aligned row everywhere else, from the
same markup.

Two things worth knowing. The sheet and the modal are the same bits-ui Dialog —
focus trap, scroll lock, Escape, outside click — laid out differently; the
popover is a different primitive and is **not** modal and does **not** trap
focus, so do not put a destructive confirmation behind `desktop="popover"`.
And crossing the breakpoint with the panel open remounts it, because there is no
honest way to morph a popover into a sheet. Anything mid-edit inside it wants
state that lives above the panel.

There is **one** chip. Badge absorbed Tag — a soft tinted chip, not a solid
pill. There is no `Tag` export and no `solid` badge variant: an opaque fill can
only be correct on one surface, and badge fills are translucent so they read on
the page, on a card and on a table tile alike.

## Marketing pages

A logged-out landing is not a product surface. It is read once, top to
bottom, by a stranger, on a phone as often as a monitor — so it is narrower,
breathes more, moves more, and says less per screen. The formula below was
arrived at on the two Engine landings (engine.io for creators,
integration.engine.io for operators) and calibrated against stripe.com. **Build
new landings from it rather than from the product layout**, and change it here
rather than at a call site.

### The page

```svelte
<div class="min-h-dvh bg-background text-white antialiased">
  <SiteBanner href={otherPortal} cta="Go to Engine Studio">Are you a creator? …</SiteBanner>
  <SiteHeader label="Engine Integration" links={[…]} action={{ name: "Sign in", href: "/signin" }}>
    {#snippet brand()}<EngineWordmark class="h-9" />{/snippet}
  </SiteHeader>

  <main class="mx-auto min-w-0 max-w-marketing">
    <Hero title="A Modern Take on the Traditional Aggregator." standfirst="…">
      {#snippet actions()}
        <Button variant="inverse" size="lg" href="/signin">Apply for access</Button>
        <Button variant="outline" size="lg" href="#how">Learn how it works</Button>
      {/snippet}
      {#snippet art()}<img src="/hero-render.jpg" alt="" … />{/snippet}
    </Hero>
    <Marquee label="Creators on Engine" items={logos} />

    <div class="px-gutter pb-section">
      <section id="how" class="reveal scroll-mt-anchor-sm md:scroll-mt-anchor"><Tour … /></section>
      <section id="commercials" class="reveal scroll-mt-anchor-sm md:scroll-mt-anchor">
        <SectionHead title="Every operator is on the same simplified contract." lead="…" />
        <BentoGrid onbeat={…}>…</BentoGrid>
      </section>
      <section id="scale" class="reveal …"><SectionHead … /><StatBand stats={…} caption="…" /></section>
      <section id="apply" class="reveal …"><SectionHead … /> two buttons </section>
    </div>
  </main>

  <SiteFooter tagline="…" columns={…} legal={…}>
    {#snippet brand()}<a href="/" aria-label="Engine Integration"><EngineWordmark class="h-9" /></a>{/snippet}
  </SiteFooter>
</div>
```

Order: banner, header, hero, logo marquee, walkthrough, one section per
question a stranger would ask, proof band, call to action, footer. Four to six
sections. The landings shipped with ten and were cut to five; every removal
made them better.

### Layout and type

| Token | Value | Utility |
| --- | --- | --- |
| `--container-marketing` | 1180px | `max-w-marketing` |
| `--spacing-gutter` | clamp(20px, 5vw, 64px) | `px-gutter` |
| `--spacing-section` | clamp(88px, 12vw, 160px) | `mt-section` `pb-section` |
| `--spacing-header` / `-sm` | 72px / 64px | `h-header` `-top-header` |
| `--spacing-anchor` / `-sm` | 120px / 96px | `scroll-mt-anchor` |
| `--blur-glass` | 20px | `glass` (65% page + blur) |

Four text sizes and a standfirst, each a whole spec (size, leading, tracking,
weight) on one utility. Cap headings in `ch`, not px, and `text-balance` them.

| Utility | Size | Where |
| --- | --- | --- |
| `text-hero` | clamp(38px, 5vw, 64px) · 1.02 · −0.02em · 700 | the h1, `max-w-[18ch]` |
| `text-section` | clamp(28px, 3.2vw, 44px) · 1.06 · −0.02em · 700 | every h2, `max-w-[26ch]` |
| `text-standfirst` | clamp(18px, 1.5vw, 22px) · 1.5 | under the h1, `max-w-[54ch]` |
| `text-lead` | clamp(17px, 1.4vw, 20px) · 1.5 | under an h2, `max-w-[52ch]` |
| `text-card-title` | 17px · 1.35 · 600 | the one sentence under a bento mock |
| `text-stat` | 42px · 0.94 · 900, tabular | a proof figure (32px below `md`) |
| `text-body` | 16px · 1.5 | every caption, label, footer line and line of sub text |
| `text-nav` | 16px · 1.25 | every navigation item: header links, footer links, tabs, segments, tour steps |
| `text-small` | 13px · 1.5 | badge chips and mock screens only |

Inside a mock screen the scale is smaller again — 15px bold titles, 11–13px
text, 10px tags — because a mock is a picture of a product, not the page.

**Base text is white.** `text-foreground` everywhere, and grey only where it
carries meaning: an inactive step, an inactive tab, a unit beside a figure,
"by Provider" beside a game name, footer links under white headings. The
landings had `grey-400` as the default body colour and it read as a page
nobody had finished; converting it to white was the single biggest lift.
Where grey is right, it is right *because* something white sits beside it.

**No uppercase, no mono, no eyebrows, no pills** except a status tag inside a
mock. The page has four sizes of type; an uppercase tracked label is a fifth
and a mono figure a sixth. Numbers keep `tabular-nums` in the brand face.

**Copy.** The h1 is Title Case with a full stop, two lines on desktop, and it
says the one idea ("A Modern Take on the Traditional Aggregator."). Section
h2s are sentence case with a full stop and are a claim, not a label ("Every
creator on Engine is on the same simplified contract."). The standfirst is
two or three plain sentences ending in an instruction ("Apply and go live
today."). Bento captions are one sentence each. Tour step titles are Title
Case imperatives ("Set Your Exposure Limits."). Nothing is a heading that
could be a sentence.

### Motion

The grammar lives in `styles/marketing.css` and is global; a mock screen
needs no `<style>` block. The timings are the settled ones — they were tuned
by eye against Stripe until the pages read as calm — and they are custom
properties (`--motion-*`) so a page can slow them all together if it must.

| Utility | What it does | Timing |
| --- | --- | --- |
| `rise` | an element arriving: 8px up with a fade | 700ms out, `--i` × 140ms stagger |
| `sweep` | a fill growing from the left: gauge, split bar | 1400ms, +300ms |
| `climb` | a bar growing from the bottom | 1000ms, `--i` × 60ms + 300ms |
| `settle` | the confirmation: "Saved.", "Paid." | 600ms, at 3000ms |
| `swap-out` `swap-in` | a tag going from pending to done, stacked in one cell | 300ms out at 3000ms, in +100ms |
| `type-in` | a typewriter that works in any face (clip-path, not width) | 1400ms, steps(`--chars`) |
| `live-dot` | the pulse beside anything live | 2400ms loop |
| `reveal` | a section fading in as it enters the viewport | scroll-driven, first 220px |
| `motion-gate` + `live` | hold every utility below paused until in view | BentoGrid sets it |

Component timings, for reference and not for tuning: a Tour step holds 8s;
its screen flies in over 700ms after 200ms and its callout after 400ms; both
fade out over 300ms. The bento beat is 3s and one card moves per beat, so each
rotates every 12s. Stats count up over 2.4s, 90ms apart. The marquee takes
56s per pass. The hero render breathes over 48s.

Rules, each learned the expensive way:

- **Everything is gated on visibility.** A scene that plays below the fold
  has nothing left when the reader arrives. `Tour` screens mount only while
  active; `BentoGrid` and `StatBand` use `inView`; use it for your own blocks.
- **One beat per page.** Rotating things share `BentoGrid`'s metronome and
  take turns. Two independent intervals on one screen reads as an advert.
- **Reduced motion shows end states.** The base layer collapses every
  animation, so a `both`-filled keyframe lands on its last frame and the mock
  reads as finished. The Tour stops advancing and the beat does not start.
- **Rotating rows never use `rise`.** A row entering as another leaves
  inherits a stagger and leaves a hole. Use Svelte `fly` / `flip` / `fade`
  (600 / 700 / 300ms) for kept lists; `rise` is for a scene being built.
- **`reveal` is opacity only.** A translate on it makes every anchor scroll
  land short, because the browser measures the still-translated box.
- **Draw a chart with a `clip-path` wipe,** not a dash-offset. With
  `preserveAspectRatio="none"` and `vector-effect: non-scaling-stroke` the
  dash is measured in screen space and the line stops at ~70%.
- **No hover pause on a tour, no pause button.** Both were tried and removed.
  Clicking a step is the control. Hover pause is fine on a marquee.
- **Loops are for the product's own liveness** — a live dot, a rotating live
  table, a logo marquee, a slow breathing render — never decoration. The
  brand document's "no looping animation" is read that narrowly here and no
  further; see Known gaps.

### Surfaces

- The hero art is a monochrome render, full-bleed, hidden below `lg`, blended
  with `mix-blend-screen` so its black becomes the page, masked to fade at the
  bottom. Mask and blend on the SAME element. It starts at the header's top
  edge so it shows through the glass.
- `glass` on the header, always on, and nowhere else on the page. No rule
  under it, no cell dividers.
- One border on the whole page: the footer's top rule. Cards and mock panels
  are two tones (`bg-card` over the page, page colour inside), not outlines.
  The Tour frame keeps its one `grey-600` border because it is a device.
- A `SiteBanner` is the press shade with white text — a measured exception
  to "ink on accent is Off Black" (5.25:1 vs 3.67:1 on that shade). It is the
  one place a brand fill carries 16px regular-weight text.
- Announce nothing above the h1. Announcement pills, eyebrows and "How it
  works" labels were all removed; the h1 starts the page.

### Verify

Screenshot every Tour step and every viewport at 1440, 1024, 820 and 375
after a layout change; the mock's content boxes overflow silently. Measure
grey text against any tinted backdrop — `grey-400` on a magenta wash drops
under AA and has to be lifted a step. Anchor targets must land with the
heading fully below the glass.

## Themes

Two ship: **Engine Magenta** (dark, the default) and **Engine Magenta Light**.
Select one with `data-theme` on `<html>` or on any subtree:

```html
<html data-theme="engine-magenta-light">
<section data-theme="engine-magenta">…</section>   <!-- a dark band in a light page -->
```

With no `data-theme`, the page is Engine Magenta, which is the token values below.
Existing apps change nothing.

- **Name a role, never a colour.** `text-foreground`, not `text-white`;
  `bg-foreground/6` for a hover wash, not `bg-white/6`; `bg-scrim` behind a
  modal. A literal `white` or `black` is a light-theme bug.
- **The grey ramp is relative to the page.** `grey-900` is the page in every
  theme and the steps fall toward the ink, so `bg-grey-850` field /
  `border-grey-600` hairline / `text-grey-300` secondary text are correct in
  both themes. Don't pick a grey step for its absolute lightness.
- **Ink on a fill is the fill's `-foreground`.** Engine Magenta's status fills
  take Off Black; the light theme's deeper status steps take white.
  `primary-300` is "ink on a magenta tint": lighter magenta on dark, deeper
  magenta (#C2004F) on light.
- **Landings stay dark.** The hero render's `mix-blend-screen` needs a dark
  page. Pin marketing pages to `data-theme="engine-magenta"`.
- **New themes.** Copy a file in `styles/themes/`, change the selector and
  values, and run `bun run check:themes`. It checks the full contract,
  dark/default parity, and AA contrast on every text pair. An overlay theme
  (no `color-scheme`) changes a few roles and stacks:
  `data-theme="engine-magenta volt"`. The contract and the worked overlay
  example are in `styles/themes/README.md`, which ships in `dist`.
- `themes` (name, label, scheme) is exported for pickers.

## Tokens

Use these names; never a literal. Values shown are Engine Magenta.

```
colour     --color-background #0E0E0E   --color-foreground #FFFFFF
           --color-primary #FF006A      --color-primary-press #D60059
           --color-primary-300 #FF5C9B  (ink on a magenta tint)
           --color-primary-tint-12 / -24
           --color-card #161616         --color-popover #1C1C1C
           --color-grey-950 … --color-grey-050   (the only greys)
           --color-partner-yellow #FFDD00        (reserved, not in use)
status     --color-success #00C46A  --color-warning #FFB020  --color-danger #FF3B30
           each with -foreground (always Off Black) and -tint-12
           --color-destructive aliases danger
layout     --container-marketing 1180px   --spacing-gutter clamp(20px,5vw,64px)
           --spacing-section clamp(88px,12vw,160px)   --spacing-header 72 / -sm 64
           --spacing-anchor 120 / -sm 96   --blur-glass 20px
type sizes --text-body 16px (all reading text)  --text-nav 16px (navigation)
           --text-hero --text-section --text-standfirst --text-lead
           --text-card-title --text-stat   (marketing pages only)
           --text-small 13px   (badge chips and mock screens only)
radii      --radius-tag 6  --radius-field 10  --radius-card-inner 10
           --radius-media 14  --radius-card 18  --radius-frame 26
           --radius-control 999
motion     --ease-brand  --ease-brand-out  --ease-brand-accelerate
           140ms controls · 220ms surfaces · 360–640ms reveals
           --animate-{overlay,dialog,sheet,popover}-{in,out}
           marketing: --motion-{reveal,stagger,settle,swap,fill,pulse,step,beat}
           and the utilities rise sweep climb settle swap-in/out type-in
           live-dot reveal motion-gate glass
type       --font-brand = DM Sans, from Google Fonts — you add the link
           (see below); --font-condensed --font-extra-condensed --font-mono
           are roles that resolve to the brand face
depth      --shadow-panel  --shadow-modal   (product chrome and modals only;
           a theme tints them via --shadow-panel-color / --shadow-modal-color)
           --color-scrim rgb(10 10 10 / 0.72)   (behind a modal or sheet)
utility    `field` — the shared input skin, incl. the focus ring
```

## Rules

- **Nothing people read is under 16px.** Body copy, sub text, descriptions,
  captions, labels, field values, table cells, tooltips and menu items are
  `text-body` (16px). Every navigation item is `text-nav` (16px) or larger.
  The only things under 16px are badge chips, button labels (15px bold, or
  13px on `sm`), and the inside of a mock screen. Don't reach for
  `text-[13px]`, `text-small`, `text-xs` or `text-sm` for sub text: make it
  grey, not smaller.

- **Three brand colours**: Off Black, Pure White, Magenta. One accent per
  surface, never two.
- **Status colour is functional.** `success`/`warning`/`danger` report state.
  Never use them as a categorical palette — `success` for "slots" because green
  looked right spends the only signal they carry.
- **No off-palette colour.** Not Tailwind's stock ramps, not a hex literal. CI
  fails on both.
- **Retired and unavailable**: Originals Orange `#FF6200`, Sportsbook Blue
  `#00CCFF`. No accents, no charts, no status.
- **Ink on any status or accent fill is its `-foreground` token.** On Engine Magenta that is Off Black, because white fails AA on all three status fills there.
- **Magenta text**: never below 15px bold. Use `--color-primary-300` on a tint.
- No gradients. No `dark:` variants: light is a theme, and a component that
  names roles needs none. No drop shadows on brand surfaces. No coloured borders, and no
  coloured left-edge accent to signal category or ownership.
- Radii by role, and the outer frame is always larger than the inner panel.
- Borders are 1px hairline or 1.5px container rule. Nothing else.
- **No emoji, anywhere.** Only `×` for close and `✱` for footnotes.
- Voice: declarative, British/AU spelling, headlines end in a full stop.
- Icons: Lucide, 2px stroke, `currentColor`.

## Extending

The copy is the product's to edit, but prefer extending a variant map beside
it. That keeps the copy diffable against upstream for the next port. Don't
upstream a product-only variant. Every variant map is exported:

```ts
import { buttonVariants } from "$lib/engine-ui/index.js"
import { tv } from "tailwind-variants"

export const appButtonVariants = tv({
  extend: buttonVariants,
  variants: { variant: { drawer: "w-full justify-start rounded-none …" } },
})
```

Brand rules stay in the copy; product variants stay beside it. Every
primitive also passes `class` through `cn`, so `<Button class="w-full" />` works
without `!important`. `cn` knows the system's own scales — `rounded-card`
against `rounded-lg`, `mt-section` against `mt-0`, `text-small` against
`text-[13px]` — so a named token overrides and is overridden like any stock
value. Use the copy's `cn`, not a fresh `twMerge`, or those conflicts fall
back to stylesheet order.

## Known gaps

State these rather than working around them silently.

1. **No categorical palette.** A per-topic hue set is an unmade brand decision.
2. **Two deviations from the brand document**, both deliberate: Badge is one
   component where §6 specifies two, and Alert signals state with a coloured
   left-edge bar which §11 prohibits for *category or ownership* — state is a
   narrower reading, not an exemption.
3. **No mono face.** JetBrains Mono is retired; `--font-mono` resolves to the
   brand face. Set it yourself if a surface genuinely needs character-cell
   alignment.
4. **The brand face is loaded by you, not shipped.** `--font-brand` names DM
   Sans, a variable Google Font, and `styles/fonts.css` ships a metric-matched
   local fallback behind it. No binary ships. Put the link in `app.html`:

   ```html
   <link rel="preconnect" href="https://fonts.googleapis.com" />
   <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
   <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />
   ```

   No `@font-face`, no `@theme` override. Google's CSS is `font-display:
   swap`, so an app that covers first paint with a loader waits on
   `document.fonts.load('400 1rem "DM Sans"')` under a cap before lifting it.

   **This is a required setup step and it fails quietly** — exactly like a
   missing `@source` line. Skip it and nothing errors; the app renders in the
   size-adjusted Helvetica Neue / Arial fallback. Generic-looking type is the
   symptom.

   Proxima Nova used to ship here. It is commercially licensed and this package
   is MIT and public, which is why it stopped; the brand team moved to DM Sans,
   which is open, in September 2026. A product on another brand overrides
   `--font-brand` in its own `@theme`.
5. **Dialog, Popover and Tooltip do not animate.** They are written against
   `animate-in` / `fade-in-0` / `zoom-in-95` / `slide-in-from-top-2`, which
   come from the `tailwindcss-animate` plugin. This package neither ships nor
   depends on it, so those class names generate no CSS — the panels appear and
   vanish instantly, and the gallery's "enter over 220ms, exit over 140ms" note
   is aspirational. The `--animate-*` tokens ResponsiveDialog uses are the
   replacement; the three older primitives have not been moved onto them yet.
6. **Engine Integration's accent is unsettled** — build Integration in magenta;
   `--color-partner-yellow` exists but is not in use — except that the
   creators landing paints its cross-portal `SiteBanner` yellow because it
   points at Integration. That is the open decision showing, not a ruling.
7. **Marketing pages loop.** The brand document (§9) says never a looping
   decorative animation. The landings loop — a logo marquee, a live dot, a
   rotating live table, a 48s breathing render — at the owner's direction, and
   the package now ships the components that do it. The reading applied: a
   loop that shows the product being live is the product, not decoration;
   everything else in the document's list (bounce, spring, parallax, glowing
   borders, pulsing badges) still holds. The document should say so.
8. **Section headings on marketing pages are sentence case.** The brand
   document says Title Case for headlines. The landings keep Title Case for
   the h1 and Tour step titles and set every h2 as a sentence, at the owner's
   direction, because an h2 that is a claim reads better as a sentence than as
   a title. Not a rule for product surfaces.
