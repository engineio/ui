<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Totals row: the same lighter surface as the header, so a table reads as
  // filled top and bottom with the body between them.
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
    "border-t border-grey-600 bg-grey-700 font-semibold [&_tr]:border-b-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tfoot>
