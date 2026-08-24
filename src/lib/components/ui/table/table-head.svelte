<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLThAttributes } from "svelte/elements"

  // Column headings are Bold 13px in Pure White, Title Case, tracking normal.
  //
  // NOT the system's 11px uppercase label spec, which is what these carried
  // until now. Two reasons: at 11px with +0.08em on a dense grid the headings
  // read as decoration rather than as the column names, and the brand reserves
  // UPPERCASE for "small structural labels" — permission, not instruction.
  // Title Case is the brand's default everywhere else, and a heading set in
  // white Bold is unambiguous about which column it names.
  //
  // Left-aligned by default. Numeric columns should pass `class="text-right"`
  // and set the cells to match, so figures align on their digits.
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
    "h-11 px-4 text-left align-middle whitespace-nowrap",
    "text-[13px] font-bold text-foreground",
    "[&:has([role=checkbox])]:pr-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</th>
