<script lang="ts">
  import type { WithElementRef } from "../../../utils.js"
  import { cn } from "../../../utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Sits outside the frame, below it — caption at 16px (`text-body`) on the grey ramp.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> = $props()
</script>

<caption
  bind:this={ref}
  class={cn("mt-4 text-body text-grey-300", className)}
  {...restProps}
>
  {@render children?.()}
</caption>
