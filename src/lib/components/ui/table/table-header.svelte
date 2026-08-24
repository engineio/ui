<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Transparent. With the rows as blocks, a filled header bar would read as
  // one more block rather than as the labels for the ones below it — so the
  // headings sit directly on the page colour and the blocks start beneath.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<thead bind:this={ref} class={cn("bg-transparent", className)} {...restProps}>
  {@render children?.()}
</thead>
