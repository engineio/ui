<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLTdAttributes } from "svelte/elements"

  // 56px tall with 20px side padding: the block needs room to read as a panel
  // rather than a stripe, and this is the density the system's card padding
  // implies at row scale.
  //
  // Set numerics, IDs and keys in `font-mono` at the call site; the brand
  // reserves the monospace face for them.
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
    "h-14 px-5 align-middle text-[15px] [&:has([role=checkbox])]:pr-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</td>
