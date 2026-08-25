---
name: engine-design-system
description: Rules and component reference for the Engine design system (@engineio/ui). Use when building or reviewing any Engine surface — Svelte components, styles, tokens, colour, type, spacing, the brand marks — or when choosing a Button/Badge/Alert variant, adding a component variant, or picking a colour.
---

Read `node_modules/@engineio/ui/AGENTS.md` before writing UI. It ships with the
package, so it matches the installed version — do not rely on memory of these
rules, and do not copy them into a repo where they will go stale.

If that file is absent the package is not installed here; say so rather than
guessing at the system.

Non-negotiable, and worth having in mind before you read further:

- Three brand colours: Off Black `#0E0E0E`, Pure White `#FFFFFF`, Magenta
  `#FF006A`. One accent per surface.
- Never a hex literal or a Tailwind stock colour. Use a token. CI fails on both.
- `success` / `warning` / `danger` are FUNCTIONAL. They report state, never
  category, and never decoration.
- Ink on any status or accent fill is Off Black. White fails AA on all three.
- No emoji. No gradients. No light theme. No `dark:` variants.
- Add a variant by `tv({ extend: … })` in the product, never by forking a
  component or upstreaming a product-only variant.

For anything the file does not cover, choose the quieter and more mechanical
option, and flag the gap rather than inventing a rule.
