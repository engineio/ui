<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // No fill. Totals sit directly on the page colour, so the row reads as a
  // summary of the grid rather than as one more tile in it — the weight alone
  // carries it.
  //
  // `!` on the transparent fill is doing real work: the cells set their own
  // `bg-card` and a `group-hover/row:` lift, and a totals row is neither a
  // tile nor interactive. Without the override the footer would paint like a
  // body row and light up on hover like a selectable one.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<tfoot
  bind:this={ref}
  class={cn(
    "font-semibold [&_td]:bg-transparent! [&_th]:bg-transparent!",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tfoot>
