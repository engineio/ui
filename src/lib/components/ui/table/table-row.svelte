<script lang="ts">
  import type { WithElementRef } from "../../../utils.js"
  import { cn } from "../../../utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // A hairline underneath and nothing else. The row paints its own hover and
  // selection now that the cells are transparent — no `group/row` plumbing
  // needed, because the background it sets is the background you see.
  //
  // Hover is the system's 6% white wash; selection is the magenta tint, which
  // is the one place the accent earns a place in a dense grid. Neither takes a
  // coloured border: the brand rules those out, edge accents included.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props()
</script>

<tr
  bind:this={ref}
  class={cn(
    "border-b border-border transition-colors duration-140 ease-brand",
    "hover:bg-foreground/6",
    "data-[state=selected]:bg-primary-tint-12",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tr>
