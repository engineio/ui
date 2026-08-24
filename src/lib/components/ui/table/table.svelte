<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLTableAttributes } from "svelte/elements"

  // A list of blocks, not a grid of lines. The page colour is the ground and
  // each row is its own card floating on it, separated by a gap — no frame,
  // no rules, no dividers. Depth comes from the panels themselves, which is
  // the system's rule ("depth comes from rules and nested panels, not
  // shadow") taken to its other end.
  //
  // `border-separate` plus `border-spacing-y` is what makes the gaps: it is
  // the only way to space table rows, because margin does nothing on a `tr`
  // and a gap cannot cross a table's internal layout. `border-spacing-x-0`
  // keeps the columns tight — spacing applies to both axes otherwise, and
  // gapped columns would break every row into loose cells.
  //
  // The trade-off worth knowing: `border-separate` disables the sticky-header
  // trick that relies on collapsed borders. If you need a sticky header on a
  // long table, that is the one case for keeping a bordered variant.

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
      "w-full caption-bottom border-separate border-spacing-x-0 border-spacing-y-2 text-[15px]",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </table>
</div>
