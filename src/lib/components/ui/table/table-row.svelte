<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // The row paints nothing — every cell is its own tile, so the fill, radius
  // and states all live on the cells.
  //
  // What the row DOES carry is the hover and selection context. A row is
  // still the unit a person reads and clicks, so hovering one tile has to
  // light up all of them; `group/row` here plus `group-hover/row:` on the
  // cells is what reaches across. The group is named rather than bare because
  // a table cell frequently contains its own `group` (a button, a menu), and
  // an unnamed group would let the nearest one win.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props()
</script>

<tr bind:this={ref} class={cn("group/row", className)} {...restProps}>
  {@render children?.()}
</tr>
