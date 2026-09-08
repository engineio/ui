<script lang="ts" module>
  /**
   * The two sanctioned colourways, and the only two.
   *
   *   primary   — Pure White, for the dark surfaces the brand actually uses
   *   secondary — Off Black, for print, letterhead and inverted brand panels
   *
   * These are named after the wordmark artwork they are cut from
   * (Primary_Wordmark_White.svg / Primary_Wordmark_Black.svg) rather than after
   * the colour, so the files and the code agree.
   */
  export type EngineMarkVariant = "primary" | "secondary"
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js"
  import type { SVGAttributes } from "svelte/elements"

  // The Engine figure mark: the wordmark's g, which is what this mark has
  // always been. It is not separate artwork and must not be redrawn as any.
  //
  // THE PATH IS NOT CROPPED, THE viewBox IS. The `d` below is byte-identical
  // to the sixth path of engine-wordmark.svelte, and the viewBox frames that
  // path's own bounds (762.043 0.257324 362.577 546.597) inside the wordmark's
  // coordinate system. Diff the two files and the glyph must match exactly; if
  // it ever does not, one of them has been edited by hand and both are wrong.
  // Re-cutting after new wordmark artwork lands is a viewBox measurement, not
  // a drawing job.
  //
  // THE MARK IS ARTWORK, NOT AN ICON. The brand allows it in white or Off
  // Black and nothing else — never outlined, stretched, skewed, or recoloured.
  // That is why colour is a two-value `variant` rather than `currentColor`:
  // with currentColor any ancestor's text colour silently becomes brand
  // colour, and a magenta wordmark is one careless `text-primary` away. The
  // variant makes the sanctioned choice the only reachable one.
  //
  // Sizing is by class, and height-only: `class="h-8"` with width following
  // from the viewBox. Never set both — the brand forbids distortion, and the
  // 663x1000 ratio is not one anybody reproduces by hand.

  let {
    ref = $bindable(null),
    variant = "primary",
    class: className,
    title,
    ...restProps
    }: SVGAttributes<SVGSVGElement> & {
    ref?: SVGSVGElement | null
    variant?: EngineMarkVariant
    /**
     * Accessible name. Omit when the mark sits beside the word "Engine" or
     * other naming text — then it is decorative and gets aria-hidden, so a
     * screen reader does not announce the brand twice.
     */
    title?: string
  } = $props()
</script>

<svg
  bind:this={ref}
  viewBox="762.043 0.257324 362.577 546.597"
  xmlns="http://www.w3.org/2000/svg"
  class={cn(
    "h-8 w-auto shrink-0",
    variant === "primary" ? "text-foreground" : "text-background",
    className,
  )}
  role={title ? "img" : undefined}
  aria-hidden={title ? undefined : "true"}
  {...restProps}
>
  {#if title}
    <title>{title}</title>
  {/if}
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M1124.62 93.3265H1100.2C1114.53 119.182 1122.69 148.926 1122.69 180.577C1122.69 180.757 1122.68 180.937 1122.68 181.117L1122.69 366.531C1122.69 466.12 1041.95 546.854 942.363 546.854H870.632C862.065 546.854 855.12 539.909 855.12 531.341V469.193C855.12 460.625 862.065 453.68 870.632 453.68H942.363C990.195 453.68 1029.61 414.364 1029.61 366.531V338.419C1003.76 352.742 974.014 360.9 942.363 360.9C842.775 360.899 762.043 280.165 762.043 180.577C762.043 80.9903 842.774 0.259036 942.36 0.257324H1124.62V93.3265ZM942.363 93.3265C894.176 93.3272 855.113 132.39 855.112 180.577C855.112 228.765 894.176 267.83 942.363 267.83C990.551 267.83 1029.62 228.765 1029.62 180.577C1029.62 132.39 990.55 93.3265 942.363 93.3265Z"
  />
</svg>
