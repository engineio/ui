<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLTableAttributes } from "svelte/elements"

  // A ruled table: no frame, no fills, no gaps. The surface behind it shows
  // through and the only structure is a hairline under each row — which is the
  // system's rule that depth comes from rules and nested panels, with the
  // rules doing all of the work.
  //
  // `border-collapse: collapse` (Tailwind's `border-collapse`) is deliberate
  // and is what makes the dividers meet cleanly: under `separate` each cell
  // paints its own bottom edge and adjacent cells double them up. It also
  // restores the sticky-header technique, which the gapped-tile treatment this
  // replaces had ruled out.

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
      "w-full caption-bottom border-collapse text-[13px]",
      className,
    )}
    {...restProps}
  >
    {@render children?.()}
  </table>
</div>
