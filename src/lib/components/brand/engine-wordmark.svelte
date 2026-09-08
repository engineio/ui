<script lang="ts">
  import { cn } from "$lib/utils.js"
  import type { SVGAttributes } from "svelte/elements"
  import type { EngineMarkVariant } from "./engine-icon.svelte"

  // The Engine wordmark. Vector, from the brand team's artwork
  // (Primary_Wordmark_Black.svg / Primary_Wordmark_White.svg, 2001x550).
  //
  // "The engine wordmark is a custom soft-rounded face, not Proxima Nova. It is
  // artwork. Never set the wordmark in type, never approximate it in a
  // lookalike, never outline, stretch, skew or recolour it beyond white / Off
  // Black." That rule is the reason this component exists.
  //
  // Colour is the same two-value variant as EngineIcon, for the same reason:
  // `currentColor` would let any ancestor's text colour become brand colour.
  //
  // THE viewBox IS NOT THE ARTWORK'S BOUNDING BOX, AND MUST NOT BE "FIXED".
  //
  // The letters occupy 0.2573..360.902 vertically and the g's leg descends to
  // 546.854, 185.952 below them. The artwork's own box centres on 275; the word
  // centres on 180.58. Anything vertically centring this mark, such as a flex
  // header or a table cell, would put the word 94 units too high and leave the
  // descender doing the balancing.
  //
  // So the box is padded above the letters by exactly the descender depth,
  // 185.952. The artwork is untouched; the box is now symmetric about the word,
  // its centre (180.58) lands on the word's centre, and `items-center` is
  // correct with no per-call-site nudging.
  //
  // The cost is that the word occupies 49% of the box height, so a given `h-*`
  // renders the letters at ~73% of the size the previous artwork gave — that
  // mark's g ended in a short chin (87 units) where this one carries a full
  // leg (186), and a symmetric box has to answer the deepest ink. Height and
  // word size cannot both be preserved across that change; height was, because
  // the box height is the layout height and every call site is inside a header
  // or a flex row. Sites wanting the old apparent size need one or two steps up
  // the scale, at the cost of a taller row.
  //
  // Sizing is height-only by class. At 2001x732.549 (2.73:1), `class="h-6"`
  // gives a ~66px-wide wordmark. Check the small end, because the counters in
  // the two "e"s and the "g" close up before the shape stops being legible.
  // Master-brand surfaces carry this; a sub-brand surface carries a lockup
  // (wordmark plus the sub-brand name), which this package does not ship
  // because the badge artwork is still raster.

  let {
    ref = $bindable(null),
    variant = "primary",
    class: className,
    title = "Engine",
    ...restProps
    }: SVGAttributes<SVGSVGElement> & {
    ref?: SVGSVGElement | null
    variant?: EngineMarkVariant
    /**
     * Accessible name, defaulting to "Engine". Unlike the icon, a wordmark
     * carries the company name as its content, so it is almost never
     * decorative. Pass `title={undefined}` to hide it from screen readers when
     * it sits next to naming text.
     */
    title?: string | undefined
  } = $props()
</script>

<svg
  bind:this={ref}
  viewBox="0 -185.6947 2001 732.5487"
  xmlns="http://www.w3.org/2000/svg"
  class={cn(
    "h-6 w-auto shrink-0",
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
  <g fill="currentColor">
    <path
      d="M1222.56 0.257327C1231.12 0.257327 1238.07 7.20204 1238.07 15.7688L1238.07 345.387C1238.07 353.954 1231.12 360.898 1222.56 360.898H1160.51C1151.94 360.898 1145 353.954 1145 345.387L1145 15.7688C1145 7.20204 1151.94 0.257324 1160.51 0.257324L1222.56 0.257327Z"
    />
    <path
      d="M561.34 4.13525C660.282 4.13525 740.611 83.822 741.65 182.517H741.663V345.389C741.662 353.955 734.716 360.899 726.15 360.899H664.104C655.538 360.899 648.594 353.955 648.594 345.389V184.455L648.564 182.204C647.369 135.057 608.775 97.2045 561.34 97.2045C513.906 97.2048 475.312 135.057 474.117 182.204L474.09 184.455V345.389C474.089 353.955 467.143 360.899 458.577 360.899H396.531C387.965 360.899 381.021 353.955 381.021 345.389V182.517H381.033C382.072 83.8222 462.399 4.13562 561.34 4.13525Z"
    />
    <path
      d="M1438.76 4.13525C1537.7 4.13525 1618.03 83.8233 1619.07 182.52H1619.08V345.392C1619.08 353.958 1612.14 360.901 1603.57 360.902H1541.53C1532.96 360.902 1526.02 353.958 1526.01 345.392V184.455L1525.99 182.204C1524.79 135.057 1486.2 97.2045 1438.76 97.2045C1391.33 97.2048 1352.73 135.057 1351.54 182.204L1351.51 184.455V345.392C1351.51 353.958 1344.57 360.902 1336 360.902H1273.95C1265.39 360.902 1258.45 353.958 1258.44 345.392V184.455C1258.44 184.325 1258.44 184.195 1258.44 184.065V182.52H1258.45C1259.49 83.8235 1339.82 4.13562 1438.76 4.13525Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M180.32 4.13525C279.261 4.13525 359.59 83.822 360.63 182.517H360.642V198.03C360.642 206.596 353.696 213.54 345.129 213.54H100.336C113.8 244.354 144.543 265.889 180.32 265.89C201.63 265.89 221.157 258.251 236.309 245.561C241.937 240.847 249.909 239.435 256.267 243.106L311.95 275.253C319.899 279.843 322.181 290.34 316.141 297.251C283.087 335.069 234.493 358.959 180.32 358.959C82.6782 358.959 3.16776 281.351 0.097017 184.455H0C3.5e-06 183.484 0.0095752 182.515 0.0248762 181.547C0.0095752 180.58 3.49954e-06 179.61 0 178.639H0.097017C3.16776 81.7431 82.6782 4.13561 180.32 4.13525ZM180.32 97.2045C146.839 97.2047 117.769 116.065 103.139 143.738H257.501C242.871 116.065 213.8 97.2045 180.32 97.2045Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1819.79 4.13525C1918.73 4.13556 1999.05 83.8222 2000.09 182.517H2000.11V198.03C2000.11 206.596 1993.16 213.54 1984.6 213.54H1739.8C1753.27 244.354 1784.01 265.89 1819.79 265.89C1841.1 265.89 1860.62 258.251 1875.78 245.561C1881.4 240.848 1889.37 239.436 1895.73 243.106L1951.41 275.253C1959.36 279.843 1961.65 290.34 1955.61 297.251C1922.55 335.069 1873.96 358.959 1819.79 358.959C1722.14 358.959 1642.63 281.351 1639.56 184.455H1639.46C1639.46 183.484 1639.47 182.515 1639.49 181.547C1639.47 180.58 1639.47 179.61 1639.47 178.639H1639.56C1642.63 81.7429 1722.14 4.13526 1819.79 4.13525ZM1819.79 97.2045C1786.31 97.2045 1757.24 116.065 1742.61 143.738H1896.97C1882.34 116.065 1853.27 97.2047 1819.79 97.2045Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1124.62 93.3265H1100.2C1114.53 119.182 1122.69 148.926 1122.69 180.577C1122.69 180.757 1122.68 180.937 1122.68 181.117L1122.69 366.531C1122.69 466.12 1041.95 546.854 942.363 546.854H870.632C862.065 546.854 855.12 539.909 855.12 531.341V469.193C855.12 460.625 862.065 453.68 870.632 453.68H942.363C990.195 453.68 1029.61 414.364 1029.61 366.531V338.419C1003.76 352.742 974.014 360.9 942.363 360.9C842.775 360.899 762.043 280.165 762.043 180.577C762.043 80.9903 842.774 0.259036 942.36 0.257324H1124.62V93.3265ZM942.363 93.3265C894.176 93.3272 855.113 132.39 855.112 180.577C855.112 228.765 894.176 267.83 942.363 267.83C990.551 267.83 1029.62 228.765 1029.62 180.577C1029.62 132.39 990.55 93.3265 942.363 93.3265Z"
    />
  </g>
</svg>
