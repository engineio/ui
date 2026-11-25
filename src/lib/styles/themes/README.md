# Themes

A theme is one CSS rule that gives every colour role a value. Components never
name a colour, only a role (`bg-card`, `text-foreground`, `border-grey-600`,
`bg-scrim`), so swapping the rule restyles everything at once, with no `dark:`
variants and no component changes.

| Theme | `data-theme` | Scheme |
| --- | --- | --- |
| Engine Magenta (the default) | `engine-magenta` | dark |
| Engine Magenta Light | `engine-magenta-light` | light |

## Selecting one

```html
<html data-theme="engine-magenta-light">
```

Any element works, not just `<html>`. A subtree takes its own theme, and the
derived roles (tints, ring, destructive) re-resolve inside it:

```html
<html data-theme="engine-magenta-light">
  …
  <section data-theme="engine-magenta">a dark band inside a light page</section>
```

If no `data-theme` is set, the page renders the defaults in `tokens.css`, which
are Engine Magenta. Apps that never opt in see no change.

Following the OS setting takes a line in `app.html`, before first paint:

```html
<script>
  const light = matchMedia("(prefers-color-scheme: light)").matches
  document.documentElement.dataset.theme = light ? "engine-magenta-light" : "engine-magenta"
</script>
```

The package exports `themes` (name, label, scheme) for building a picker.

## Adding a theme

1. Copy `engine-magenta-light.css` (for a light theme) or `engine-magenta.css`
   (for a dark one) to `themes/<name>.css`, or into your product's own CSS.
2. Change the selector to `[data-theme~="<name>"]` and change the values.
3. Add it to `themes/index.css` if the package ships it.
4. Run `bun run check:themes`.

The check fails if a theme leaves out any role in the contract, if
`engine-magenta.css` drifts from the defaults in `tokens.css`, or if any text
pair falls under its contrast floor. The floors are 7:1 for body text, 4.5:1 for
secondary text, placeholders, status text, ink on tints and ink on fills, and
3:1 for magenta at 15px bold.

A product can keep a theme in its own stylesheet and never upstream it. Load it
after `@engineio/ui/styles` so its rule wins.

### The contract

`engine-magenta.css` is the canonical list. A full theme sets:

- `color-scheme` (`dark` or `light`), so native scrollbars, form controls and
  autofill follow the theme.
- Page and surfaces: `background`, `foreground`, `card`, `popover`, each with
  `-foreground`.
- Accent: `primary`, `primary-foreground`, `primary-press`, `primary-300` (the
  ink for text on a primary tint: lighter than the accent on a dark page,
  darker on a light one).
- `partner-yellow`, `partner-yellow-press`.
- The grey ramp, `grey-950` to `grey-050`. **The ramp is relative to the page,
  not to black.** `grey-900` is the page and the numbers fall toward the ink:
  `850` is a field, `600` a hairline, `400` a placeholder, `300` secondary text,
  `050` nearly the ink. Match each step's contrast against your page to the
  Engine Magenta step's contrast against its page, and every component reads
  correctly.
- Semantic neutrals: `secondary`, `muted`, `accent` (each with
  `-foreground`), `border`, `input`.
- Status: `success`, `warning`, `danger`, each with `-foreground`. The
  foreground is whatever ink clears 4.5:1 on that fill. That's Off Black on the
  dark theme's bright steps and white on the light theme's deep ones.
- Sidebar: `sidebar-background`, `-foreground`, `-primary-foreground`,
  `-accent`, `-accent-foreground`, `-border`.
- Depth: `scrim` (the dim behind a modal), `--shadow-panel-color`,
  `--shadow-modal-color`.

Derived, so a theme doesn't need to set them (but may override them):
`primary-tint-12/24`, `partner-yellow-tint-12`, `success/warning/danger-tint-12`,
`destructive` and its foreground, `ring`, `sidebar-primary`, `sidebar-ring`.

### Overlay themes

A rule without `color-scheme` is an overlay. It changes a few roles and stacks
on a full theme, because the selector is `~=` (one word in a space-separated
list):

```css
@layer base {
  [data-theme~="volt"] {
    --color-primary: #d8fb4f;
    --color-primary-foreground: #0e0e0e;
    --color-primary-press: #c4e83a;
    --color-primary-300: #d8fb4f;
  }
}
```

```html
<html data-theme="engine-magenta volt">
```

The check only validates an overlay's names, not its contrast, because it can't
know which base it will sit on. Check the pairs on each base you use it with.

## What a theme cannot change

Radii, spacing, type, motion and the brand face are tokens too, but not theme
tokens. A product that needs different ones overrides them in its own `@theme`,
as the casino's Fluke bridge does. A `data-theme` rule can set them, but the
check doesn't look at them.

The marketing hero blends a black render into the page with
`mix-blend-screen`, which only works on a dark page. Pin landings to
`engine-magenta` until there is light artwork.
