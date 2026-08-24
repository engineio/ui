<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Transparent, separated from the body by a rule one step stronger than the
  // row dividers. That single difference in weight is what makes the header
  // read as a header without needing a fill.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<thead
  bind:this={ref}
  class={cn("[&_tr]:border-b [&_tr]:border-grey-600", className)}
  {...restProps}
>
  {@render children?.()}
</thead>
