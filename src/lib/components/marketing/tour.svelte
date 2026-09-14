<script lang="ts" module>
  /**
   * One step of a Tour. `title` and `body` are the step list; `nav` is which
   * sidebar item lights up in the mock and `url` what its address bar shows
   * after the host; `callout` is the card that hangs off the frame's corner
   * and says what the reader is looking at.
   */
  export type TourStep = {
    id: string
    title: string
    body: string
    nav: string
    url: string
    callout: { title: string; body: string; path: string }
  }
</script>

<script lang="ts">
  import { EngineWordmark } from "$lib/components/brand/index.js"
  import { cn } from "$lib/utils.js"
  import ChevronRight from "@lucide/svelte/icons/chevron-right"
  import Lock from "@lucide/svelte/icons/lock"
  import type { Snippet } from "svelte"
  import { cubicOut } from "svelte/easing"
  import { fade, fly, slide } from "svelte/transition"
  import { inView } from "./motion.js"

  // The Stripe-style product walkthrough: a numbered step list beside a
  // browser-frame mock of the product, one screen per step, one callout per
  // step, advancing on its own every eight seconds.
  //
  // WHAT THIS OWNS AND WHAT THE CONSUMER OWNS. Tour is the shell — the list,
  // the progress timer, the frame, the address bar, the sidebar, the callout
  // and every piece of timing. The consumer owns the screens: a `screen`
  // snippet rendered inside the frame for the active step, and the CSS it
  // needs. Screens are built from the marketing utilities (`rise`, `sweep`,
  // `settle`, `swap-in`…) which are global, so a consumer usually needs no
  // style block at all. Screens mount only while active, which is why they
  // need no motion gate: a `rise` inside one plays when the step arrives.
  //
  // TIMING, and why it is where it is. The step advances on the progress
  // bar's own `animationend`, not on a setInterval. That makes pause a CSS
  // property (`animation-play-state`) and keeps the bar and the step in lock
  // step by construction — there is no drift to correct. The bar is paused
  // while the tour is off screen and switched off entirely under reduced
  // motion, where clicking a step is the only way through. The `i === index`
  // guard stops an outgoing bar's final `animationend` advancing twice.
  //
  // The reveal timings are the settled ones: the screen flies in over 700ms
  // after 200ms, the callout over 700ms after 400ms, and both fade out over
  // 300ms, so a step change reads as "the screen changes, then someone points
  // at it". Do not tighten these to product-surface speeds; a tour is read,
  // not operated.
  //
  // NO HOVER PAUSE AND NO PAUSE BUTTON, deliberately. Both were tried and
  // removed — a tour that stops whenever the pointer wanders over it feels
  // broken, and a pause control is furniture nobody uses. Clicking a step is
  // the control.
  //
  // THE CALLOUT HANGS OFF THE FRAME, never over the screen. Earlier versions
  // placed it per step inside the frame and it covered the very thing the
  // step was about on a 1180px column. It now sits below the frame on small
  // screens and off the bottom-right corner from `lg`, over the bezel only.
  // The frame column reserves the room (`pb-[172px] lg:pb-[104px]`).
  //
  // THE MOCK IS DECORATIVE. The frame is `aria-hidden`; the accessible content
  // is the step list and the callout, which between them say everything the
  // screens show.

  let {
    steps,
    navItems,
    org,
    host = "engine.io",
    hint = "Choose a step",
    index = $bindable(0),
    stepMs = 8000,
    screen,
    class: className,
  }: {
    steps: TourStep[]
    navItems: string[]
    /** The organisation name in the mock's sidebar. */
    org: string
    /** The address bar shows `host` followed by the step's `url`. */
    host?: string
    /** The label above the step list on desktop. */
    hint?: string
    /** The active step. Bind it to drive counters or copy from outside. */
    index?: number
    /** How long a step holds before advancing. 8s reads; 5.6s hurried. */
    stepMs?: number
    screen: Snippet<[TourStep, number]>
    class?: string
  } = $props()

  let visible = $state(false)
  let reduced = $state(false)
  let strip = $state<HTMLElement | null>(null)

  const step = $derived(steps[index] ?? steps[0])
  const running = $derived(visible && !reduced)

  $effect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => (reduced = query.matches)
    sync()
    query.addEventListener("change", sync)
    return () => query.removeEventListener("change", sync)
  })

  // Below `lg` the list is a horizontal chip strip; keep the active chip
  // centred as the tour advances so the reader can see which step is on.
  $effect(() => {
    const list = strip
    const chip = list?.querySelector<HTMLElement>(`[data-step="${index}"]`)
    if (!list || !chip || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({
      left: chip.offsetLeft - (list.clientWidth - chip.offsetWidth) / 2,
      behavior: reduced ? "auto" : "smooth",
    })
  })
</script>

<div
  {@attach inView((v) => (visible = v), { threshold: 0.2 })}
  class={cn("grid gap-6 lg:grid-cols-[minmax(280px,5fr)_minmax(0,8fr)] lg:items-start lg:gap-12", className)}
>
  <div class="min-w-0">
    <p class="mb-3 text-small text-foreground max-lg:hidden">{hint}</p>
    <ol
      bind:this={strip}
      class="relative flex flex-col max-lg:flex-row max-lg:gap-2 max-lg:overflow-x-auto max-lg:pb-1 max-lg:[scrollbar-width:none]"
    >
      {#each steps as s, i (s.id)}
        <li class="max-lg:w-[220px] max-lg:shrink-0">
          <button
            type="button"
            data-step={i}
            aria-current={i === index ? "step" : undefined}
            onclick={() => (index = i)}
            class="group flex w-full cursor-pointer flex-col py-3.5 text-left transition-colors duration-220 ease-brand max-lg:h-full max-lg:rounded-card-inner max-lg:px-3.5 max-lg:py-3 lg:-mx-3 lg:w-[calc(100%+24px)] lg:rounded-card-inner lg:px-3 {i === index
              ? 'bg-grey-850'
              : 'max-lg:bg-card lg:hover:bg-grey-850/60'}"
          >
            <span class="flex items-center gap-3">
              <span class="text-[11px] {i === index ? 'text-white' : 'text-grey-400'}">0{i + 1}</span>
              <span
                class="text-[15px] leading-[1.3] font-semibold transition-colors duration-140 ease-brand {i === index
                  ? 'text-white'
                  : 'text-grey-300 group-hover:text-white'}"
              >
                {s.title}
              </span>
              <ChevronRight
                class="ml-auto size-4 shrink-0 transition-colors duration-140 ease-brand max-lg:hidden {i === index
                  ? 'text-white'
                  : 'text-grey-500 group-hover:text-white'}"
                aria-hidden="true"
              />
            </span>
            {#if i === index}
              <span class="block pl-[30px]" transition:slide={{ duration: reduced ? 0 : 320 }}>
                <span class="mt-1.5 block text-small leading-[1.45] text-foreground max-lg:hidden">{s.body}</span>
              </span>
              <span
                class="mt-3 block h-px w-full overflow-hidden bg-grey-700 lg:ml-[30px] lg:w-[calc(100%-30px)]"
                aria-hidden="true"
              >
                <span
                  class="progress block h-full w-full bg-primary"
                  class:paused={!running}
                  style="--step-ms: {stepMs}ms"
                  onanimationend={() => {
                    if (i === index) index = (i + 1) % steps.length
                  }}
                ></span>
              </span>
            {/if}
          </button>
        </li>
      {/each}
    </ol>
  </div>

  <div class="relative min-w-0 pb-[172px] lg:pb-[104px]">
    <div class="overflow-hidden rounded-frame border border-grey-600 bg-grey-800 p-2" aria-hidden="true">
      <div
        class="flex aspect-[3/4] flex-col overflow-hidden rounded-card bg-background md:aspect-[16/10] lg:aspect-[4/3]"
      >
        <div class="flex h-9 shrink-0 items-center gap-3 bg-grey-850 px-3">
          <span class="flex w-[42px] gap-1.5">
            <span class="size-2 rounded-full bg-grey-600"></span>
            <span class="size-2 rounded-full bg-grey-600"></span>
            <span class="size-2 rounded-full bg-grey-600"></span>
          </span>
          <span
            class="mx-auto flex h-6 max-w-[70%] min-w-0 items-center gap-1.5 rounded-control bg-background px-3 text-[10px] text-grey-300"
          >
            <Lock class="size-2.5 shrink-0" />
            <span class="truncate">{host}{step.url}</span>
          </span>
          <span class="w-[42px]"></span>
        </div>

        <div class="flex min-h-0 flex-1">
          <aside class="w-37.5 shrink-0 bg-grey-850 p-3 max-md:hidden">
            <EngineWordmark class="mx-1 h-4" title={undefined} />
            <div class="mt-3 rounded-tag bg-grey-800 px-2 py-1.5 text-[11px] font-semibold text-white">
              {org}
            </div>
            <ul class="mt-3 space-y-0.5">
              {#each navItems as item (item)}
                <li
                  class="flex items-center justify-between rounded-tag px-2 py-1.5 text-[11px] transition-colors duration-220 ease-brand {item ===
                  step.nav
                    ? 'bg-grey-800 text-white'
                    : 'text-grey-400'}"
                >
                  {item}
                  {#if item === step.nav}
                    <span class="size-1 rounded-full bg-primary"></span>
                  {/if}
                </li>
              {/each}
            </ul>
          </aside>

          <div class="relative min-w-0 flex-1">
            {#each steps as s, i (s.id)}
              {#if i === index}
                <div
                  class="@container absolute inset-0 overflow-hidden p-4 md:p-5"
                  in:fly={{ y: 10, duration: reduced ? 0 : 700, delay: reduced ? 0 : 200, easing: cubicOut }}
                  out:fade={{ duration: reduced ? 0 : 300 }}
                >
                  {@render screen(s, i)}
                </div>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    </div>

    {#each steps as s, i (s.id)}
      {#if i === index}
        <div
          class="absolute right-0 bottom-0 left-0 z-10 rounded-card border border-grey-600 bg-popover p-4 lg:right-[-24px] lg:left-auto lg:w-[320px]"
          in:fly={{ y: 12, duration: reduced ? 0 : 700, delay: reduced ? 0 : 400, easing: cubicOut }}
          out:fade={{ duration: reduced ? 0 : 300 }}
        >
          <div class="flex items-center gap-2">
            <span class="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true"></span>
            <p class="text-[15px] font-semibold text-white">{s.callout.title}</p>
          </div>
          <p class="mt-1.5 text-small leading-[1.45] text-grey-300">{s.callout.body}</p>
          <p class="mt-3 text-[11px] text-foreground">{s.callout.path}</p>
        </div>
      {/if}
    {/each}
  </div>
</div>

<style>
  /* The step timer. A linear fill is right here: it is a clock, not a
     reveal, and a clock that eases reads as running slow then fast. */
  .progress {
    transform-origin: left;
    animation: progress var(--step-ms) linear both;
  }

  .paused {
    animation-play-state: paused;
  }

  @keyframes progress {
    from {
      scale: 0 1;
    }
    to {
      scale: 1 1;
    }
  }

  /* No timer at all under reduced motion — not a fast one. A 0.01ms fill
     would fire animationend and advance every step in the same frame. */
  @media (prefers-reduced-motion: reduce) {
    .progress {
      animation: none;
    }
  }
</style>
