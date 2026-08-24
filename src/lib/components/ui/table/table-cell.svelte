<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLTdAttributes } from "svelte/elements"

  // Dense by default — this is a business tool, not a marketing surface.
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
    "h-11 px-4 align-middle text-[15px] [&:has([role=checkbox])]:pr-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</td>
