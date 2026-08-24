<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // The lighter of the table's two surfaces — grey-700 on the background,
  // separated from the body by a hairline rather than a shadow.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<thead
  bind:this={ref}
  class={cn("bg-grey-700 [&_tr]:border-b [&_tr]:border-grey-600", className)}
  {...restProps}
>
  {@render children?.()}
</thead>
