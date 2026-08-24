<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Each row is a block: filled on the grey ramp, 18px radius, sitting on the
  // page colour with a gap above and below.
  //
  // The radius goes on the END CELLS, not the row. `border-radius` on a `tr`
  // is ignored under `border-separate` — the row is not a painted box, the
  // cells are — so the left corners belong to the first cell and the right
  // corners to the last. Rounding the row instead silently does nothing,
  // which is the usual way this pattern is got wrong.
  //
  // Hover lifts the fill toward grey-600. The system's "fills darken" rule is
  // written for magenta controls; darkening a #242424 block on near-black
  // reads as receding, so a block lifts instead. Selection replaces the fill
  // with the magenta tint rather than adding a coloured border — the brand
  // rules out coloured borders and edge accents outright.
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
    "bg-grey-700 transition-colors duration-140 ease-brand",
    "[&>*:first-child]:rounded-l-card [&>*:last-child]:rounded-r-card",
    "hover:bg-grey-600",
    "data-[state=selected]:bg-primary-tint-24",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tr>
