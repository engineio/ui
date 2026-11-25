<script lang="ts">
  import { cn } from "../../utils.js"
  import type { Snippet } from "svelte"

  // The landing page hero: a left-aligned headline, a standfirst, a row of
  // two buttons, and optionally a full-bleed art layer behind them.
  //
  // LEFT-ALIGNED, and it stays that way. A centred hero was tried; with art
  // behind it the text and the art fought for the same middle. Left-aligned,
  // the h1 is capped at 18ch and the standfirst at 54ch, so the right half of
  // the viewport is always free for the render and the words never sit on
  // top of it.
  //
  // THE ART LAYER is full-bleed — it escapes the column to the viewport's
  // edges with `calc(50% - 50vw)` — and starts at the top of the HEADER, not
  // the hero, so its top band shows through the glass bar at rest. It is
  // hidden below `lg`, where it would have to cross the text. Paint the
  // render into the `art` snippet with its own mask and blend; the layer here
  // is only the box. What the landings settled on for a monochrome render: a
  // bottom fade (`mask-image: linear-gradient(to bottom, black 55%,
  // transparent)`), `mix-blend-screen` so its black background becomes the
  // page, and a 48s breathing drift. Mask and blend go on the SAME element
  // (the img) — a mask on the container isolates it and the blend stops
  // working.
  //
  // PAINT ORDER. The wrapper is `relative`, the art layer positioned with no
  // z-index, and the text section `relative z-10`, so the text paints above
  // the art and nothing later in the page can paint over the buttons. Do not
  // add `isolate` to the section.
  //
  // Padding is `clamp(64px, 9vw, 128px)` above and `clamp(80px, 11vw, 152px)`
  // below, going to zero below `md` where the next block (usually a logo
  // marquee) brings its own 48px.

  let {
    title,
    standfirst,
    heading,
    actions,
    art,
    level = 1,
    class: className,
  }: {
    /** The h1. Title Case, full stop, two lines on desktop. */
    title?: string
    /** Under the h1: two or three plain sentences, the last an instruction. */
    standfirst?: string
    /** Instead of `title`, when the h1 needs markup (a <br>). */
    heading?: Snippet
    /** The buttons: an inverse primary and an outline secondary. */
    actions?: Snippet
    /** The full-bleed backdrop. Hidden below `lg`. */
    art?: Snippet
    /** The heading level. A page has one h1; a hero shown inside another page is a 2. */
    level?: 1 | 2
    class?: string
  } = $props()
</script>

<div class="relative">
  {#if art}
    <div
      class="pointer-events-none absolute -top-header-sm right-[calc(50%_-_50vw)] bottom-0 left-[calc(50%_-_50vw)] overflow-hidden max-lg:hidden md:-top-header"
      aria-hidden="true"
    >
      {@render art()}
    </div>
  {/if}

  <section
    class={cn(
      "relative z-10 flex flex-col items-start px-gutter pt-[clamp(64px,9vw,128px)] pb-[clamp(80px,11vw,152px)] text-left max-md:pb-0",
      className,
    )}
  >
    <svelte:element this={`h${level}`} class="max-w-[18ch] text-hero text-balance text-foreground">
      {#if heading}
        {@render heading()}
      {:else}
        {title}
      {/if}
    </svelte:element>

    {#if standfirst}
      <p class="mt-6 max-w-[54ch] text-standfirst text-balance text-foreground">{standfirst}</p>
    {/if}

    {#if actions}
      <div class="mt-8 flex flex-wrap gap-3 max-sm:w-full max-sm:flex-col">
        {@render actions()}
      </div>
    {/if}
  </section>
</div>
