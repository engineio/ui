<script lang="ts">
  import type { WithElementRef } from "../../../utils.js"
  import { cn } from "../../../utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props()
</script>

<div
  bind:this={ref}
  class={cn(
      "bg-card text-card-foreground rounded-card",
      className,
    )}
  {...restProps}
>
  {@render children?.()}
</div>
