<script lang="ts" module>
  export type Stat = {
    /** The figure to count up to, already scaled (9.7 for "9.7B"). */
    target: number
    label: string
    decimals?: number
    prefix?: string
    suffix?: string
  }
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { untrack } from "svelte"
  import { cubicOut } from "svelte/easing"
  import { Tween } from "svelte/motion"
  import { inView, prefersReducedMotion } from "./motion.js"

  // The proof band: four big figures that count up when the reader reaches
  // them, each with a magenta plus.
  //
  // THE PLUS IS A PROMISE. It says "at least this", so the figures passed in
  // should be floored, not rounded — 3,800 games when there are 3,812, $23B
  // when there are $23.4B. A figure that rounds UP past the truth with a plus
  // beside it is a false claim. Floor before you call this.
  //
  // COUNT-UP. 2.4s on the settling curve, each figure starting 90ms after the
  // one before, once 35% of the band is visible. The tweens start at the
  // target so a prerender and a no-JS reader see the real numbers; they are
  // zeroed in an effect and counted up on sight. Late data is fine: change a
  // `target` after the band has been seen and the figure re-runs to the new
  // value, which is how a static snapshot hands over to a live fetch.
  //
  // Reduced motion shows the targets and never zeroes them.
  //
  // Labels are 13px WHITE. The caption under the band says where the numbers
  // come from and when — "Platform-wide totals, live from engine.io." — and
  // the landings learned to add what the numbers do NOT mean when a reader
  // took "3,800 games" as a catalogue they would receive.

  let {
    stats,
    caption,
    plus = true,
    locale = "en-GB",
    duration = 2400,
    stagger = 90,
    class: className,
  }: {
    stats: Stat[]
    caption?: string
    /** The magenta "+" after each figure. */
    plus?: boolean
    locale?: string
    duration?: number
    stagger?: number
    class?: string
  } = $props()

  let seen = $state(false)
  // One tween per figure, made once from the initial list: a later `stats`
  // only retargets them (below), it never remakes them, so a live fetch that
  // lands mid count-up carries on from wherever the figure has got to.
  const counters = untrack(() => stats).map((s) => new Tween(s.target, { duration, easing: cubicOut }))

  $effect(() => {
    if (prefersReducedMotion()) return
    for (const c of counters) c.set(0, { duration: 0 })
  })

  $effect(() => {
    if (!seen) return
    const ms = prefersReducedMotion() ? 0 : duration
    counters.forEach((c, i) => c.set(stats[i]?.target ?? 0, { duration: ms, delay: i * stagger }))
  })

  const format = (n: number, decimals = 0) =>
    n.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
</script>

<div
  {@attach inView(
    (v) => {
      if (v) seen = true
    },
    { threshold: 0.35, once: true },
  )}
  class={className}
>
  <div class="grid grid-cols-4 gap-x-6 gap-y-10 max-md:grid-cols-2">
    {#each stats as s, i (s.label)}
      <div class="flex min-w-0 flex-col gap-2">
        <span class="text-[32px] leading-[0.94] font-black tabular-nums text-white md:text-stat">
          {s.prefix ?? ""}{format(counters[i]?.current ?? s.target, s.decimals)}{s.suffix ?? ""}{#if plus}<span
              class="text-primary">+</span
            >{/if}
        </span>
        <span class="text-small text-foreground">{s.label}</span>
      </div>
    {/each}
  </div>
  {#if caption}
    <p class={cn("mt-10 text-small text-foreground")}>{caption}</p>
  {/if}
</div>
