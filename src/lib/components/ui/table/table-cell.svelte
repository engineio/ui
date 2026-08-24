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
  // Body tiles are `--color-card` #161616; headings and totals are grey-700
  // #242424. Two surfaces, so the header reads as a header. Hover lifts a
  // body tile to the header's step, which is why the transition is on colour
  // only — nothing moves.
  //
  // 10px is `--radius-field`, the system's role for fields and INNER panels —
  // the correct step for a tile this size. An 18px card radius on a tile this
  // small reads as a lozenge.
  //
  // Hover and selection come from the row via `group-hover/row:` — one tile
  // hovered lights the whole row, because a row is still the unit a person
  // reads and clicks.
  //
  // WATCH THE FILL COLLISION. The tile is `--color-card` #161616, and one
  // thing in this package sits 2/255 away from it: the `field` surface
  // (grey-850 #141414) that Input, Textarea and SelectTrigger share. A field
  // dropped into a cell reads as flat — it is only delineated by its own 1px
  // grey-700 border, so it survives, but the fill does no work. Prefer
  // grey-850 tiles for a table you intend to put inputs in, or accept that
  // the field reads as an outline.
  //
  // Separator and the unchecked Switch track are grey-700, a comfortable 14
  // steps lighter, so they are clear at this fill — but re-check them if you
  // change the tile fill, since both collided when the tile was grey-700.
  //
  // Badge cannot collide with anything, by construction: its fills are washes
  // and tints rather than opaque steps, so they composite against whatever
  // surface they land on and stay about a step lighter everywhere. That is
  // exactly why the merged Badge has no `solid` variant.
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
    "h-11 rounded-field bg-card px-3 align-middle text-[15px]",
    "transition-colors duration-140 ease-brand",
    "group-hover/row:bg-grey-700",
    "group-data-[state=selected]/row:bg-primary-tint-24",
    "[&:has([role=checkbox])]:pr-0",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</td>
