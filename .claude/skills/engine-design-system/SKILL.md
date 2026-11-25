---
name: engine-design-system
description: Rules and component reference for the Engine design system (engineio/ui). Use when building or reviewing any Engine surface — Svelte components, styles, tokens, themes, colour, type, spacing, the brand marks — or when choosing a Button/Badge/Alert variant, adding a component variant, or picking a colour.
---

Read the Engine design system's `AGENTS.md` before writing UI: `../engine-ui/AGENTS.md`
in the sibling checkout, or https://engineio.github.io/ui/AGENTS.md. Don't rely
on memory of these rules, and don't copy them into a repo where they will go
stale.

The components are a reference. A product copies them into its own tree with
`bun ../engine-ui/scripts/copy-into.ts <dest>` and owns the copy. `ENGINE-UI.md`
in the copy records the upstream commit it matches.

Non-negotiable, and worth having in mind before you read further:

- Three brand colours: Off Black `#0E0E0E`, Pure White `#FFFFFF`, Magenta
  `#FF006A`. One accent per surface.
- Never a hex literal or a Tailwind stock colour. Use a token. Name a role
  (`text-foreground`, `bg-card`), never `white` or `black`, so the light theme
  works.
- `success` / `warning` / `danger` are FUNCTIONAL. They report state, never
  category, and never decoration.
- Ink on a status or accent fill is its `-foreground` token.
- Nothing people read is under 16px: `text-body` for sub text, `text-nav` for
  navigation. Make sub text grey, not smaller.
- No emoji. No gradients. No `dark:` variants: light is a theme.
- Add a variant by `tv({ extend: … })` beside the copy, rather than editing
  the copied component, so the copy stays diffable against upstream.

For anything the file does not cover, choose the quieter and more mechanical
option, and flag the gap rather than inventing a rule.
