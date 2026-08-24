<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Totals sit in a block of their own, one step darker than the rows so it
  // reads as a summary rather than one more item in the list. Rounding is on
  // the end cells for the same reason as TableRow.
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
    "font-semibold",
    "[&>tr]:bg-grey-850 [&>tr]:hover:bg-grey-850",
    "[&>tr>*:first-child]:rounded-l-card [&>tr>*:last-child]:rounded-r-card",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tfoot>
