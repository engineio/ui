<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Sits outside the frame, below it — caption at 13px on the grey ramp.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props()
</script>

<caption
  bind:this={ref}
  class={cn("mt-4 text-[13px] leading-[1.2] text-grey-300", className)}
  {...restProps}
>
  {@render children?.()}
</caption>
