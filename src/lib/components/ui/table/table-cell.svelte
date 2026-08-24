<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLTdAttributes } from "svelte/elements"

  // The tile. Each cell is a panel in its own right: filled on the grey ramp,
  // 10px radius, gapped from its neighbours by the table's border-spacing.
  //
  // 44px tall with 12px sides — dense, which is what a business tool wants.
  // The gap between tiles does the work padding would otherwise do, so the
  // padding only has to hold the text off its own tile edge.
  //
  // 10px is `--radius-field`, the system's role for fields and INNER panels —
  // the correct step for a tile this size. An 18px card radius on a tile this
  // small reads as a lozenge.
  //
  // Hover and selection come from the row via `group-hover/row:` — one tile
  // hovered lights the whole row, because a row is still the unit a person
  // reads and clicks.
  //
  // WATCH THE FILL COLLISION. The tile is grey-700, and four other things in
  // this package are filled grey-700 too — put any of them in a cell and it
  // disappears into the tile:
  //
  //   Badge variant="secondary"   -> use variant="outline"
  //   Tag variant="solid"         -> use the default (outline) variant
  //   Separator                   -> pass class="bg-grey-500"
  //   Switch, unchecked track     -> pass class="data-[state=unchecked]:bg-grey-500"
  //
  // Safe as they are: Button (its secondary is grey-800), Tag's default and
  // brand variants, Input and Textarea (grey-850), and any outline treatment.
  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLTdAttributes> = $props()
</script>

<td
  bind:this={ref}
  class={cn(
    "h-11 rounded-field bg-grey-700 px-3 align-middle text-[15px]",
    "transition-colors duration-140 ease-brand",
    "group-hover/row:bg-grey-600",
    "group-data-[state=selected]/row:bg-primary-tint-24",
    "[&:has([role=checkbox])]:pr-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</td>
