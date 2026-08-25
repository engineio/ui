# @engineio/ui — agent reference

The Engine design system. This file ships inside the package, so it arrives in
`node_modules/@engineio/ui/AGENTS.md` and versions with the code — point at it
rather than copying its contents into a repo, or the copy goes stale.

Authoritative source: `docs/brand/ENGINE-DESIGN-SYSTEM.md` and
`ENGINE-BRAND.md` in the `engineio/engine` repo. Where this file and those
disagree, **they win and this is a bug**.

## Setup

```css
@import "tailwindcss";
@import "@engineio/ui/styles";
@source "../../../node_modules/@engineio/ui/dist";
```

**The `@source` line is not optional and its absence is silent.** Tailwind 4
does not scan `node_modules`, so without it the utility classes the components
are written against are never generated. The tokens still land and any class
that also appears in local source still works, so you get a half-styled app
that reads like a component bug. Path is relative to the CSS file declaring it.

## Importing

```svelte
import { Button, Card, CardHeader } from "@engineio/ui"
import { Button } from "@engineio/ui/components/ui/button/index.js"
import * as Card from "@engineio/ui/components/ui/card/index.js"
import { EngineWordmark } from "@engineio/ui/components/brand/index.js"
```

Root barrel exports flat prefixed names (`CardHeader`). Subpath modules export
`Root`/`Header`/`Content`, so `import * as Card` works. Both `/index.js` and the
bare subpath resolve.

## Components

Alert, Badge, Button, Card, Checkbox, Dialog, Input, Label, Popover, Progress,
RadioGroup, Select, Separator, Skeleton, Switch, Table, Tabs, Textarea, Tooltip.
Marks: `EngineWordmark`, `EngineIcon`.

Not shipped, on purpose: `sonner`, `form`, `data-table`, `drawer`, `resizable`,
`carousel`, `chart`. Copy from the engine repo if needed.

| Component | Variants |
| --- | --- |
| Button | `default` `inverse` `outline` `ghost` `secondary` `link` `icon` `destructive` `success`; sizes `sm` `default` `lg` `icon` `icon-sm` `icon-lg` |
| Badge | `default` `secondary` `outline` `partner` `success` `warning` `danger` `destructive` |
| Alert | `default` `success` `warning` `danger` `destructive`; optional `onDismiss` |
| Marks | `variant="primary"` (white) or `"secondary"` (Off Black) |

There is **one** chip. Badge absorbed Tag — a soft tinted chip, not a solid
pill. There is no `Tag` export and no `solid` badge variant: an opaque fill can
only be correct on one surface, and badge fills are translucent so they read on
the page, on a card and on a table tile alike.

## Tokens

Use these names; never a literal.

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
radii      --radius-tag 6  --radius-field 10  --radius-card-inner 10
           --radius-media 14  --radius-card 18  --radius-frame 26
           --radius-control 999
motion     --ease-brand  --ease-brand-out  --ease-brand-accelerate
           140ms controls · 220ms surfaces · 360–640ms reveals
type       --font-brand (Proxima Nova) --font-mono (JetBrains Mono, see gaps)
depth      --shadow-panel  --shadow-modal   (product chrome and modals only)
utility    `field` — the shared input skin, incl. the focus ring
```

## Rules

- **Three brand colours**: Off Black, Pure White, Magenta. One accent per
  surface, never two.
- **Status colour is functional.** `success`/`warning`/`danger` report state.
  Never use them as a categorical palette — `success` for "slots" because green
  looked right spends the only signal they carry.
- **No off-palette colour.** Not Tailwind's stock ramps, not a hex literal. CI
  fails on both.
- **Retired and unavailable**: Originals Orange `#FF6200`, Sportsbook Blue
  `#00CCFF`. No accents, no charts, no status.
- **Ink on any status or accent fill is Off Black.** White fails AA on all three.
- **Magenta text**: never below 15px bold. Use `--color-primary-300` on a tint.
- No gradients. No light theme. No `dark:` variants — the dark palette is the
  only palette. No drop shadows on brand surfaces. No coloured borders, and no
  coloured left-edge accent to signal category or ownership.
- Radii by role, and the outer frame is always larger than the inner panel.
- Borders are 1px hairline or 1.5px container rule. Nothing else.
- **No emoji, anywhere.** Only `×` for close and `✱` for footnotes.
- Voice: declarative, British/AU spelling, headlines end in a full stop.
- Icons: Lucide, 2px stroke, `currentColor`.

## Extending

Do not fork a component to add a variant, and do not upstream a product-only
variant. Every variant map is exported:

```ts
import { buttonVariants } from "@engineio/ui"
import { tv } from "tailwind-variants"

export const appButtonVariants = tv({
  extend: buttonVariants,
  variants: { variant: { drawer: "w-full justify-start rounded-none …" } },
})
```

Brand rules stay in the package; product variants stay in the product. Every
primitive also passes `class` through `cn`, so `<Button class="w-full" />` works
without `!important`.

## Known gaps

State these rather than working around them silently.

1. **No categorical palette.** A per-topic hue set is an unmade brand decision.
2. **Two deviations from the brand document**, both deliberate: Badge is one
   component where §6 specifies two, and Alert signals state with a coloured
   left-edge bar which §11 prohibits for *category or ownership* — state is a
   narrower reading, not an exemption.
3. **JetBrains Mono is not loaded.** `--font-mono` falls back to the platform
   monospace, so every mono surface is off-brand until the binary ships.
4. **Proxima Nova is commercially licensed** and ships inside this package.
5. **Engine Integration's accent is unsettled** — build Integration in magenta;
   `--color-partner-yellow` exists but is not in use.
