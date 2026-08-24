<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLThAttributes } from "svelte/elements"

  // The system's label: 11px Semibold, uppercase, +0.08em tracking. Column
  // headings are structural labels, which is the one place UPPERCASE is
  // sanctioned.
  //
  // Transparent, and padded to match the cells (px-4) so a heading lines up
  // with the left edge of the text in the tiles below it rather than with the
  // tile itself.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLThAttributes> = $props()
</script>

<th
  bind:this={ref}
  class={cn(
    "h-8 px-4 text-left align-middle whitespace-nowrap",
    "text-[11px] font-semibold tracking-[0.08em] text-grey-400 uppercase",
    "[&:has([role=checkbox])]:pr-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</th>
