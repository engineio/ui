<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // 13px on the grey ramp, one step under the title. Never tinted to match the
  // bar — the panel stays neutral so the bar is the only signal.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props()
</script>

<div
  bind:this={ref}
  class={cn("mt-1 text-[13px] leading-[1.45] text-grey-300", className)}
  {...restProps}
>
  {@render children?.()}
</div>
