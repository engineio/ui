<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLThAttributes } from "svelte/elements"

  // Headings are tiles too — same fill and radius as the cells, so the header
  // reads as the top course of the grid rather than as floating labels above
  // it. Padding matches the cells so a heading sits directly over the text of
  // the column it names.
  //
  // The system's label spec otherwise: 11px Bold, uppercase, +0.08em
  // tracking. Column headings are structural labels, which is the one place
  // UPPERCASE is sanctioned. Ink is Pure White — on a filled tile the label
  // is doing real work, so it takes full-strength text rather than a muted
  // step.
  //
  // No hover state: the cells take `group-hover/row:` but a heading is not
  // part of the row a person is pointing at.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLThAttributes> = $props()
</script>

<th
  bind:this={ref}
  class={cn(
    "h-9 rounded-field bg-grey-700 px-3 text-left align-middle whitespace-nowrap",
    "text-[11px] font-bold tracking-[0.08em] text-foreground uppercase",
    "[&:has([role=checkbox])]:pr-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</th>
