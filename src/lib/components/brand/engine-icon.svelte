<script lang="ts" module>
  /**
   * The two sanctioned colourways, and the only two.
   *
   *   primary   — Pure White, for the dark surfaces the brand actually uses
   *   secondary — Off Black, for print, letterhead and inverted brand panels
   *
   * These are named after the source artwork (Engine_Primary_Icon.svg /
   * Engine_Secondary_Icon.svg) rather than after the colour, so the files and
   * the code agree.
   */
  export type EngineMarkVariant = "primary" | "secondary"
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js"
  import type { SVGAttributes } from "svelte/elements"

  // The Engine figure mark. Vector, from the brand team's own artwork — which
  // closes the gap the earlier marks had: every previous badge and lockup in
  // this system was a raster extraction from deck page images at roughly 29px,
  // and went soft above 24px. This scales.
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
  // 810x1000 ratio is not one anybody reproduces by hand.

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
  viewBox="0 0 810 1000"
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
    d="M809.525 207.792H755.007C786.985 265.518 805.192 331.931 805.192 402.597C805.192 521.09 754 627.625 672.527 701.297C745.977 767.713 794.816 860.839 803.724 965.356C805.349 984.429 789.676 1000 770.534 1000H632.061C612.919 1000 597.724 984.35 594.357 965.507C578.074 874.372 498.414 805.195 402.597 805.195C306.78 805.195 227.121 874.372 210.837 965.507C207.47 984.35 192.275 1000 173.134 1000H34.6592C15.5177 1000 -0.154779 984.429 1.4707 965.356C10.3784 860.84 59.2162 767.714 132.665 701.298C51.192 627.626 3.5177e-05 521.09 0 402.597C0 180.249 180.249 0 402.597 0H809.525V207.792ZM402.597 207.793C295.009 207.793 207.792 295.01 207.792 402.598C207.792 510.185 295.009 597.402 402.597 597.402C510.184 597.402 597.401 510.185 597.401 402.598C597.401 295.01 510.184 207.793 402.597 207.793Z"
  />
</svg>
