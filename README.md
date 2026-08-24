# @engineio/ui

The Engine design system: tokens, the brand face, and twenty Svelte primitives,
published once and consumed by every Engine product.

Gallery — <https://engineio.github.io/engine-ui>

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

`buttonVariants`, `badgeVariants`, `tagVariants` and `alertVariants` are all
exported for this. Every primitive also passes `class` through `cn`, so
`<Button class="w-full" />` works without `!important`.

## What ships

**Tokens** — `styles/tokens.css` as a Tailwind 4 `@theme` block. Three brand
colours, a twelve-step neutral ramp, radii by role, two shadows, three easings.

**The brand face** — Proxima Nova, seven cuts, referenced by relative path so
your bundler fingerprints them out of `node_modules`. You do not need a copy in
`static/fonts`.

**Primitives** — Alert, Badge, Button, Card, Checkbox, Dialog, Input, Label,
Popover, Progress, RadioGroup, Select, Separator, Skeleton, Switch, Table, Tabs,
Tag, Textarea, Tooltip.

Deliberately excluded: `sonner` (toasts need success/error colours that do not
exist — see Known gaps), and `form`, `data-table`, `drawer`, `resizable`,
`carousel`, `chart` (heavy dependencies, product-specific APIs). Copy those from
the engine repo into your product if you need them.

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

Conventional commits on `main`; release-please maintains a release PR. Merging
it tags `ui/vX.Y.Z` and publishes to GitHub Packages. Use `tokens:` as a commit
type for token changes so they land in their own changelog section.

We are on `0.x` on purpose. Semver means something the moment two repos depend
on you, and the token layer is still moving — breaking changes are cheap and
expected until it settles. Cut `1.0.0` when it stops.

## Known gaps

Stated rather than designed around. All five are inherited from the brand, not
introduced here.

1. **No status palette, and no categorical palette either.** No success,
   warning or error colours are defined, so `--color-destructive` resolves to
   magenta and a destructive control cannot be distinguished from a primary one
   by colour. The `destructive` button variant works around this with a magenta
   outline instead of a fill, per the design document's Danger row. **This is
   the most consequential gap and it blocks any surface with real states.**

   The same decision governs **label hues**. `Tag` ships the soft
   repository-label treatment — tinted fill, matching ink — but only in three
   variants, because the brand is three colours. A categorical palette (red,
   orange, amber, lime, teal, indigo…) is a genuine product need and a genuine
   brand decision: eighteen accents on one surface is the direct opposite of
   "one accent per surface, never two". If it is granted, it wants declaring
   once here as a named, documented group — not eighteen one-off fills
   discovered in a diff later.

   Either way it needs a brand-team decision. Do not add hues to `tokens.css`
   without one; if a product needs them sooner, keep them local and visible.

2. **Badge contrast contradicts itself.** §6 of the design document specifies
   Badge as 11px with a magenta fill and white text; §3 says to keep magenta
   fills to labels at 15px bold or larger, because white-on-magenta is 3.9:1.
   An 11px badge cannot reach the large-text threshold, so the default variant
   is a known AA failure. The document's own escape hatch is "Off Black on
   magenta is always safe" — swapping `text-primary-foreground` for
   `text-background` fixes it in one word. Not done here: it changes a
   brand-stated colour pairing, which is the brand team's call.

3. **JetBrains Mono is not loaded.** The brand specifies it for all numerics,
   keys, IDs, code and eyebrow labels. Neither engine nor rgs has ever shipped
   the binary, so every monospace surface in both products renders in the
   platform default. `--font-mono` falls back safely, but the brand face is
   absent. It is OFL-licensed and free to redistribute: drop the `.woff2` files
   into `src/lib/fonts/` and add the `@font-face` blocks to `styles/fonts.css`.

4. **Proxima Nova is commercially licensed.** The seven cuts ship inside this
   package, which is private and org-scoped — the same internal distribution as
   the copies already sitting in engine's and rgs's `static/fonts`. Worth a
   glance from whoever owns the licence before this goes anywhere less private.
   Inter is the documented substitute where the licence does not reach.

5. **Engine Integration's accent is unsettled.** Brand direction assigns it
   Partner Yellow; every shipped surface is magenta and was deliberately
   migrated there. `--color-partner-yellow` is declared and available; build
   Integration in magenta until the call is made. A half-migrated accent is
   worse than a consistent one.

## Source of truth

`docs/brand/ENGINE-DESIGN-SYSTEM.md` in the engine repo is the written
specification, and `docs/brand/ENGINE-BRAND.md` the brand guidelines. Where this
package and those documents disagree, **the documents win and this package is
wrong** — open an issue rather than changing the document to match the code.
