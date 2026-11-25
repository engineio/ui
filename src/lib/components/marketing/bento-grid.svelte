<script lang="ts">
  import { cn } from "../../utils.js"
  import type { Snippet } from "svelte"
  import { inView } from "./motion.js"

  // The grid a set of BentoCards sits in, and the metronome they share.
  //
  // Six columns from `lg`, two from `md`, one below: a wide card spans three,
  // a narrow one two, so a row is two wide or three narrow. Gaps are 12px on
  // phones and 16px above — tighter than a product grid, because the cards
  // are read as one composition.
  //
  // THE GATE. The root carries `motion-gate` and gains `live` the first time
  // a quarter of it is on screen, which starts every `rise`, `sweep`, `settle`
  // and `swap` inside the cards at once. Until then they hold their first
  // frame. This is what lets the cards be written as static scenes and still
  // play when the reader gets to them.
  //
  // THE BEAT. Rotating content — a table window, a shelf of covers, an
  // invoice cycling — must not each run its own interval. One 3s beat ticks
  // here while the grid is live, and `onbeat(n)` hands the count to the
  // consumer, who advances ONE card per tick (`n % cards`). With four
  // rotating cards each one moves every 12s and only one thing is ever in
  // motion. The beat does not run under reduced motion, so those cards show
  // their first window and stay there.

  let {
    live = $bindable(false),
    beat = $bindable(0),
    beatMs = 3000,
    onbeat,
    class: className,
    children,
  }: {
    /** True once the grid has been seen. Bind it to gate your own effects. */
    live?: boolean
    /** Ticks every `beatMs` while live. */
    beat?: number
    beatMs?: number
    onbeat?: (beat: number) => void
    class?: string
    children: Snippet
  } = $props()

  let reduced = $state(false)

  $effect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => (reduced = query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  })

  $effect(() => {
    if (!live || reduced) return
    const timer = setInterval(() => {
      beat += 1
      onbeat?.(beat)
    }, beatMs)
    return () => clearInterval(timer)
  })
</script>

<div
  {@attach inView(
    (v) => {
      if (v) live = true
    },
    { threshold: 0.25, once: true },
  )}
  class={cn("motion-gate grid gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-6", live && "live", className)}
>
  {@render children()}
</div>
