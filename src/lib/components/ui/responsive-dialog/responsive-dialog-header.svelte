<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props()
</script>

<!-- Left aligned on every surface. Dialog's own header centres below `sm`,
     which was written for a centred modal on a phone; a sheet is flush to the
     bottom edge and reads as a continuation of the page, so it stays left. -->
<div
  bind:this={ref}
  class={cn("flex flex-col gap-1.5 pr-9 text-left", className)}
  {...restProps}
>
  {@render children?.()}
</div>
