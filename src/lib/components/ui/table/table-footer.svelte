<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Totals: no fill, a stronger rule above to close the grid, and Bold to
  // separate the summary from the rows it sums. The row's own bottom hairline
  // is suppressed so the table ends on the top rule rather than trailing a
  // second line under it. Hover is off — a totals row is not interactive.
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
    "font-bold",
    "[&>tr]:border-t [&>tr]:border-grey-600 [&>tr]:border-b-0",
    "[&>tr]:hover:bg-transparent",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tfoot>
