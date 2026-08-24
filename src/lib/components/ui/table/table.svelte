<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLTableAttributes } from "svelte/elements"

  // A grid of tiles. The page colour is the ground and every cell is its own
  // panel on the grey ramp, gapped on both axes — no frame, no rules, no
  // dividers anywhere.
  //
  // `border-separate` plus `border-spacing` is the only way to space table
  // cells: margin does nothing on a `td` and a gap cannot cross a table's
  // internal layout. `border-spacing-2` sets 8px on both axes, where the
  // row-block treatment pinned the x axis to 0.
  //
  // Two trade-offs, both inherent to `border-separate` rather than to this
  // styling:
  //
  //   1. It disables the sticky-header technique that relies on collapsed
  //      borders. A long table needing a pinned header wants a ruled variant.
  //   2. `border-spacing` also applies around the table's perimeter, so the
  //      outermost tiles sit 8px in from the container on every side. Column
  //      headings take the same inset, so everything inside the table stays
  //      aligned — but the table's content edge is 8px inboard of whatever
  //      sits above it on the page. If that matters where you are using it,
  //      pass `class="-mx-2"` to pull the tiles back out to flush.

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLTableAttributes> = $props()
</script>

<div class="relative w-full overflow-x-auto">
  <table
    bind:this={ref}
    class={cn(
      "w-full caption-bottom border-separate border-spacing-2 text-[15px]",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </table>
</div>
