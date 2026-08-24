<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Nothing to do here any more. The upstream body carried
  // `[&_tr:last-child]:border-0` to suppress the trailing divider on a ruled
  // table; there are no dividers now, so it would be a no-op selector left
  // behind to confuse the next reader.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableSectionElement>> = $props()
</script>

<tbody bind:this={ref} class={cn(className)} {...restProps}>
  {@render children?.()}
</tbody>
