<script lang="ts">
  import { cn } from "$lib/utils.js"
  import type { SVGAttributes } from "svelte/elements"
  import type { EngineMarkVariant } from "./engine-icon.svelte"

  // The Engine wordmark. Vector, from the brand team's artwork.
  //
  // "The engine wordmark is a custom soft-rounded face, not Proxima Nova. It is
  // artwork. Never set the wordmark in type, never approximate it in a
  // lookalike, never outline, stretch, skew or recolour it beyond white / Off
  // Black." That rule is the reason this component exists at all — with the
  // vector in the package there is no longer any excuse to typeset "engine" in
  // Proxima Nova and hope.
  //
  // Colour is the same two-value variant as EngineIcon, for the same reason:
  // `currentColor` would let any ancestor's text colour become brand colour.
  //
  // Sizing is height-only by class. The mark is 2000x449, so `class="h-6"`
  // gives a ~107px-wide wordmark — check the small end, because the counters in
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
     * Accessible name, defaulting to "Engine" — unlike the icon, a wordmark
     * carries the company name as its content, so it is almost never
     * decorative. Pass `title={undefined}` to hide it from screen readers when
     * it sits next to naming text.
     */
    title?: string | undefined
  } = $props()
</script>

<svg
  bind:this={ref}
  viewBox="0 0 2000 449"
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
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1124.28 93.2987H1099.82C1114.16 119.218 1122.33 149.036 1122.33 180.765C1122.33 233.968 1099.36 281.802 1062.82 314.881C1095.77 344.704 1117.68 386.522 1121.67 433.456C1122.4 442.013 1115.38 448.999 1106.8 449H1044.66C1036.08 449 1029.27 441.978 1027.76 433.524C1020.46 392.599 984.73 361.532 941.748 361.532C898.765 361.532 863.032 392.599 855.733 433.524C854.225 441.978 847.414 449 838.835 449H776.699C768.119 449 761.096 442.013 761.823 433.456C765.816 386.523 787.723 344.704 820.671 314.881C784.127 281.802 761.163 233.968 761.163 180.765C761.164 80.9315 842.013 0.000368566 941.745 0H1124.28V93.2987ZM941.748 93.2987C893.491 93.2994 854.371 132.459 854.37 180.765C854.37 229.071 893.49 268.232 941.748 268.233C990.005 268.233 1029.13 229.071 1029.13 180.765C1029.13 132.459 990.005 93.2987 941.748 93.2987Z"
    />
    <path
      d="M557.281 3.88776C656.366 3.88775 736.812 83.771 737.853 182.71H737.865V345.983C737.865 354.57 730.909 361.532 722.33 361.532H660.194C651.615 361.531 644.661 354.57 644.661 345.983V184.652L644.631 182.395C643.435 135.132 604.785 97.1865 557.281 97.1865C509.777 97.1869 471.127 135.132 469.931 182.395L469.903 184.652V345.983C469.903 354.57 462.949 361.531 454.371 361.532H392.234C383.656 361.532 376.7 354.57 376.699 345.983V182.71H376.711C377.753 83.7712 458.196 3.88812 557.281 3.88776Z"
    />
    <path
      d="M1225.24 0C1233.82 0.00063118 1240.78 6.9616 1240.78 15.5485V345.981C1240.78 354.568 1233.82 361.531 1225.24 361.532H1163.11C1154.53 361.531 1147.57 354.567 1147.57 345.978V15.551C1147.57 6.96271 1154.53 0.00051524 1163.11 0H1225.24Z"
    />
    <path
      d="M1444.66 3.88776C1543.75 3.88775 1624.19 83.7707 1625.23 182.71H1625.24V345.983C1625.24 354.57 1618.29 361.532 1609.71 361.532H1547.58C1539 361.532 1532.04 354.57 1532.04 345.983V184.652L1532.01 182.395C1530.81 135.132 1492.16 97.1865 1444.66 97.1865C1397.16 97.1869 1358.51 135.132 1357.31 182.395L1357.28 184.652V345.983C1357.28 354.57 1350.33 361.531 1341.75 361.532H1279.61C1271.03 361.532 1264.08 354.57 1264.08 345.983V182.71H1264.09C1265.13 83.7709 1345.57 3.88812 1444.66 3.88776Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M180.582 3.88776C279.667 3.88775 360.113 83.771 361.154 182.71H361.166V198.258C361.166 206.846 354.212 213.809 345.633 213.809H100.481C113.966 244.699 144.753 266.288 180.582 266.288C201.923 266.288 221.478 258.63 236.652 245.909C242.288 241.184 250.272 239.768 256.639 243.448L312.403 275.674C320.364 280.275 322.649 290.798 316.601 297.727C283.498 335.638 234.834 359.587 180.582 359.587C82.7983 359.586 3.17237 281.787 0.097158 184.652H0C3.50508e-06 183.679 0.00958911 182.707 0.0249123 181.737C0.00958911 180.767 3.50462e-06 179.796 0 178.822H0.097158C3.17237 81.687 82.7983 3.88812 180.582 3.88776ZM180.582 97.1865C147.053 97.1867 117.94 116.093 103.289 143.835H257.875C243.224 116.093 214.111 97.1865 180.582 97.1865Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M1819.42 3.88776C1918.5 3.88775 1998.95 83.771 1999.99 182.71H2000V198.258C2000 206.846 1993.05 213.809 1984.47 213.809H1739.32C1752.8 244.699 1783.59 266.288 1819.42 266.288C1840.76 266.288 1860.31 258.63 1875.49 245.909C1881.12 241.184 1889.11 239.768 1895.47 243.448L1951.24 275.674C1959.2 280.275 1961.48 290.798 1955.43 297.727C1922.33 335.638 1873.67 359.587 1819.42 359.587C1721.63 359.586 1642.01 281.787 1638.93 184.652H1638.83C1638.83 183.679 1638.84 182.707 1638.86 181.737C1638.84 180.767 1638.83 179.796 1638.83 178.822H1638.93C1642.01 81.687 1721.63 3.88812 1819.42 3.88776ZM1819.42 97.1865C1785.89 97.1867 1756.77 116.093 1742.12 143.835H1896.71C1882.06 116.093 1852.94 97.1865 1819.42 97.1865Z"
    />
  </g>
</svg>
