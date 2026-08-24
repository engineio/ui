<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Suppresses the last row's hairline, so a table with no footer ends on its
  // final row rather than on a rule with nothing under it.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<tbody
  bind:this={ref}
  class={cn("[&_tr:last-child]:border-0", className)}
  {...restProps}
>
  {@render children?.()}
</tbody>
