<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLTableAttributes } from "svelte/elements"

  // The table is a panel: the page colour behind it, a hairline rule around
  // it, and a filled header on the grey ramp. Two surfaces, no third.
  //
  // `overflow-hidden` on the frame is load-bearing, not tidiness — it clips
  // the filled thead to the rounded corners. Without it the header's square
  // corners poke out past the frame's radius.
  //
  // Radius is `rounded-card` (18px) for a standalone table. Nested inside a
  // Card, pass `class="rounded-card-inner"` on the wrapper: the system's rule
  // is that the outer frame is always larger than the inner panel, and 18px
  // inside 18px breaks it.

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLTableAttributes> = $props()
</script>

<div
  class="relative w-full overflow-x-auto overflow-y-hidden rounded-card border border-grey-700 bg-background"
>
  <table
    bind:this={ref}
    class={cn("w-full caption-bottom border-collapse text-[15px]", className)}
    {...restProps}
  >
    {@render children?.()}
  </table>
</div>
