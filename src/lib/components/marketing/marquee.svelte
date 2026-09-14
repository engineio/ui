<script lang="ts" module>
  export type MarqueeItem = { src: string; alt: string; width?: number; height?: number }
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js"
  import type { Snippet } from "svelte"

  // The logo slider under a hero: a row of partner marks drifting left on a
  // 56-second loop, fading out at both edges, pausing under the pointer.
  //
  // Two copies of the track sit side by side and translate together by one
  // track width, so the loop has no seam; the second copy is `aria-hidden`
  // with empty alts so a screen reader hears each name once. The edge fade
  // is a mask, not a gradient painted over the logos, which is what keeps it
  // inside the brand's no-gradients rule.
  //
  // Logos should arrive normalised: white on transparent, alpha-trimmed,
  // fitted into a common box (480×270 is what the landings use) so the row
  // has one visual weight. A dark logo dropped in unprocessed will vanish on
  // the page. They render at 75% and lift to full on hover.
  //
  // Reduced motion: the track stands still and the row scrolls by hand.

  let {
    items,
    label,
    duration = 56,
    item,
    class: className,
  }: {
    items: MarqueeItem[]
    /** The section's accessible name, e.g. "Creators on Engine". */
    label: string
    /** Seconds for one full pass. 56 is unhurried; below 40 it distracts. */
    duration?: number
    /** Render an entry yourself (an SVG mark, a text tile) instead of an <img>. */
    item?: Snippet<[MarqueeItem, boolean]>
    class?: string
  } = $props()
</script>

<section aria-label={label} class={cn("pt-12 pb-10 md:py-14", className)}>
  <div
    class="marquee flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    style="--marquee-s: {duration}s"
  >
    {#each [false, true] as duplicate (duplicate)}
      <ul class="track flex shrink-0 items-center" aria-hidden={duplicate ? "true" : undefined}>
        {#each items as entry (entry.src)}
          <li class="shrink-0 px-[clamp(16px,2.4vw,36px)]">
            {#if item}
              {@render item(entry, duplicate)}
            {:else}
              <img
                src={entry.src}
                alt={duplicate ? "" : entry.alt}
                width={entry.width ?? 480}
                height={entry.height ?? 270}
                loading="lazy"
                fetchpriority="low"
                decoding="async"
                class="h-12 w-auto opacity-75 transition-opacity duration-220 ease-brand hover:opacity-100 md:h-20"
              />
            {/if}
          </li>
        {/each}
      </ul>
    {/each}
  </div>
</section>

<style>
  .track {
    animation: marquee var(--marquee-s, 56s) linear infinite;
  }

  .marquee:hover .track {
    animation-play-state: paused;
  }

  @keyframes marquee {
    to {
      translate: -100% 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee {
      overflow-x: auto;
      scrollbar-width: none;
    }

    .track {
      animation: none;
    }
  }
</style>
