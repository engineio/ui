<script lang="ts">
  import type { WithElementRef } from "../../../utils.js"
  import { cn } from "../../../utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // 16px (`text-body`) on the grey ramp, one step under the title. Never tinted to match the
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
  class={cn("mt-1 text-body text-grey-300", className)}
  {...restProps}
>
  {@render children?.()}
</div>
