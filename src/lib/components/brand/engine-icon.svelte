<script lang="ts" module>
  /**
   * The two sanctioned colourways, and the only two.
   *
   *   primary   — Pure White, for the dark surfaces the brand actually uses
   *   secondary — Off Black, for print, letterhead and inverted brand panels
   *
   * These are named after the brand artwork the marks are cut from
   * (Primary_Wordmark_White.svg, Primary_Icon_Black.svg, and so on) rather
   * than after the colour, so the files and the code agree.
   */
  export type EngineMarkVariant = "primary" | "secondary"
</script>

<script lang="ts">
  import { cn } from "../../utils.js"
  import type { SVGAttributes } from "svelte/elements"

  // The Engine figure mark: the turbo, from the brand team's artwork
  // (Primary_Icon_White.svg / Primary_Icon_Black.svg, 1001x1000). A housing
  // ring with a tangential outlet at the top right, and a blade at the centre.
  //
  // IT IS NO LONGER THE WORDMARK'S g. That mark is retired. The g still lives
  // in engine-wordmark.svelte as the sixth path of the word, because the word
  // still contains a g — but nothing may cut it back out into a standalone
  // mark, and this file must never again be kept in sync with that path.
  //
  // THE SOURCE FILE HAS THREE PATHS AND THIS HAS TWO, DELIBERATELY. The third
  // is an Off Black plate filling the housing's interior with the blade
  // knocked out of it — a backing, not ink. It renders invisibly on the Off
  // Black page the brand actually uses, and on anything else it forces a black
  // interior that `variant="secondary"` cannot invert. Dropped, the mark is a
  // single colour, which is the whole point of the variant. Do not re-add it;
  // if a surface needs the interior filled, that is the surface's background.
  //
  // THE MARK IS ARTWORK, NOT AN ICON. The brand allows it in white or Off
  // Black and nothing else — never outlined, stretched, skewed, or recoloured.
  // That is why colour is a two-value `variant` rather than `currentColor`:
  // with currentColor any ancestor's text colour silently becomes brand
  // colour, and a magenta mark is one careless `text-primary` away. The
  // variant makes the sanctioned choice the only reachable one.
  //
  // Sizing is by class, and height-only: `class="h-8"` with width following
  // from the viewBox. Never set both — the brand forbids distortion. At
  // 1001x1000 the mark is square, so it renders half again as wide as the old
  // g did at the same height; call sites that sized to fill a row's width may
  // want a step down the scale. Check the small end too — the housing is an
  // outline, not a solid, and at `h-6` that ring is barely over a pixel.

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
  viewBox="0 0 1001 1000"
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
  <g fill="currentColor">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M297.181 240.054C334.101 218.649 376.347 208.178 418.991 209.867C427.432 210.165 442.303 211.357 450.482 213.562C460.567 215.135 472.697 218.467 482.215 221.947C628.224 275.34 689.119 445.817 649.757 588.995C618.937 701.12 528.158 792.62 406.747 792.254C401.757 792.19 391.518 792.086 386.852 791.074C380.816 791.299 356.874 786.047 350.467 784.281C285.561 766.426 232.801 719.165 199.682 661.842C156.438 586.998 147.187 493.433 170.163 410.676C189.363 341.526 234.608 276.13 297.181 240.054ZM503.469 275.114C499.58 273.608 495.265 273.714 491.466 275.434C486.676 277.602 481.494 280.362 477.531 282.407C443.156 300.138 415.504 328.473 395.047 361.006C390.659 367.984 386.146 377.219 382.495 384.649C351.825 447.061 348.048 522.496 370.389 588.183C389.995 645.823 428.599 695.594 483.768 722.754C485.793 723.753 488.987 725.297 491.964 726.625C495.507 728.206 499.486 728.355 503.066 726.856C507.878 724.841 513.329 722.01 516.981 720.035C571.709 690.396 609.655 639.23 627.359 580.171C648.239 511.313 641.044 436.988 607.353 373.407C588.254 338.018 560.803 307.723 526.29 286.953C518.75 282.415 511.518 278.23 503.469 275.114Z"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M914.642 1.47255C920.97 1.45557 938.449 1.44224 944.986 1.47255H986.579C993.988 1.47255 999.995 7.47933 999.995 14.8891V229.723C999.998 234.452 999.997 240.511 999.997 246.407C999.996 253.818 993.988 259.825 986.577 259.841C971.465 259.874 955.892 259.95 941.422 259.95C1060.85 503.338 979.728 840.927 725.795 962.607C680.529 984.296 628.647 996.257 578.567 997.949C559.592 998.59 540.546 998.441 521.56 998.539L477.42 998.866C471.694 998.881 463.992 999.119 458.415 998.86C438.147 999.388 416.945 999.69 396.757 997.792C208.017 980.049 67.3481 826.582 19.8368 650.011C-19.5975 505.169 0.254556 350.585 75.003 220.401C138.77 109.818 252.378 22.1911 380.53 5.96001C416.419 1.41449 455.943 1.50902 492.323 1.47255H723.555C726.885 1.47192 748.98 1.47255 755.262 1.47255H914.642ZM766.235 51.8237C743.653 51.6863 721.066 51.8269 698.484 52.2496C666.788 52.6556 634.333 52.259 602.525 52.3216L469.499 52.564C448.231 52.6707 426.96 52.7651 405.692 52.8654C289.988 53.4098 185.694 115.757 117.382 206.952C0.759651 362.639 -8.85696 586.096 89.5594 753.098C105.602 780.634 124.661 806.309 146.376 829.634C216.114 903.353 303.825 947.398 405.876 949.203C430.55 949.638 465.515 946.031 489.395 939.848C496.699 937.892 503.968 935.782 511.184 933.527C512.634 933.069 521.333 930.224 522.353 930.094L522.36 930.087C532.058 926.077 541.922 922.857 551.558 918.446C654.06 871.489 726.635 782.724 765.874 678.646C792.361 606.75 802.238 530.416 795.511 455.216C795.24 452.187 794.932 449.161 794.607 446.137C793.924 439.774 793.131 433.42 792.21 427.08C787.042 391.534 778.127 356.399 765.468 322.276C758.976 304.633 749.077 283.289 741.157 266.219L716.562 212.746L715.021 209.52C715.698 209.52 725.97 209.52 725.97 209.52C731.686 209.52 768.372 209.52 789.222 209.52C796.632 209.52 802.618 203.515 802.614 196.105C802.61 187.317 802.607 177.694 802.619 170.483V91.0841C802.625 86.1256 802.624 74.8134 802.622 65.3373C802.62 57.9275 796.612 51.9182 789.203 51.8874C781.535 51.8556 773.726 51.8145 766.235 51.8237Z"
    />
  </g>
</svg>
