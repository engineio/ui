<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Totals tiles, one ramp step under the body so the row reads as a summary
  // rather than one more item. The `!` overrides matter: the cells already
  // carry their own fill and a group-hover, and a totals row is not
  // interactive — without them the footer would light up on hover like a
  // selectable row.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<tfoot
  bind:this={ref}
  class={cn("font-semibold [&_td]:bg-grey-850! [&_th]:bg-grey-850!", className)}
  {...restProps}
>
  {@render children?.()}
</tfoot>
