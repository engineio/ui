<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLTdAttributes } from "svelte/elements"

  // Transparent, 44px tall, 16px sides. The row owns the background, so a cell
  // is only text and padding.
  //
  // Set numerics, IDs and keys in `font-mono` at the call site; the brand
  // reserves the monospace face for them. Right-align numeric columns on both
  // the cell and its heading so figures line up on their digits.
  //
  // No fill means no fill collisions — the whole class of problem the gapped
  // tile treatment kept running into, where a Badge or a Separator or an
  // unchecked Switch would disappear into the cell it sat on.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLTdAttributes> = $props()
</script>

<td
  bind:this={ref}
  class={cn(
    "h-11 px-4 align-middle text-[13px] [&:has([role=checkbox])]:pr-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</td>
