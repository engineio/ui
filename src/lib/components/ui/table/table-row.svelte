<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Body rows are transparent so the table's own background shows through —
  // the two surfaces are the frame and the header, and a third would muddy
  // both. Hover is the system's 6% white wash; selection is the magenta tint,
  // which is the one place the accent earns a place in a dense grid.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLTableRowElement>> = $props()
</script>

<tr
  bind:this={ref}
  class={cn(
    "border-b border-grey-700 transition-colors duration-140 ease-brand",
    "hover:bg-white/6",
    "data-[state=selected]:bg-primary-tint-12",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</tr>
