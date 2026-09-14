<script lang="ts">
  import { cn } from "$lib/utils.js"
  import type { Snippet } from "svelte"

  // One cell of a BentoGrid: a cropped product mock on top, one sentence
  // underneath.
  //
  // The mock sits in a fixed 250px band (230px on phones) with padding on
  // three sides and none at the bottom, so the black screen inside it runs
  // off the card's lower edge — the "bleeding screen" the reference bento
  // grids use, and the reason a card can hold a whole table or an invoice
  // without showing all of it. Design the mock to be cut off; the crop is the
  // effect, not a bug to fix with a smaller mock.
  //
  // Two surfaces, no borders: the card is `bg-card` and the screen inside it
  // is the page colour, ten-pixel inner radius against the card's eighteen.
  // Set `screen={false}` to take over the band yourself (a chart that wants
  // its own layout, a shelf that needs an edge mask) and paint the panel in
  // the snippet.
  //
  // The caption is ONE sentence, set as an `h3`, ending in a full stop. The
  // landings went through eyebrow + title + body and came back to this: the
  // mock shows the thing, the sentence names it, and a second line is a
  // second thing to read. Extra content goes in `children` after it, if there
  // truly is any.

  let {
    span = 2,
    title,
    visual,
    screen = true,
    class: className,
    children,
  }: {
    /** Columns of six at `lg`: 3 is a wide card (two per row), 2 a narrow one (three per row). */
    span?: 2 | 3
    /** The one-sentence caption. */
    title?: string
    /** The mock. Built from the motion utilities; it plays when the grid goes live. */
    visual: Snippet
    /** Wrap the mock in the black screen panel. Off for a custom band. */
    screen?: boolean
    class?: string
    children?: Snippet
  } = $props()
</script>

<article
  class={cn("flex flex-col overflow-hidden rounded-card bg-card", span === 3 ? "lg:col-span-3" : "lg:col-span-2", className)}
>
  <div class="h-[230px] shrink-0 overflow-hidden px-4 pt-4 md:h-[250px] md:px-6 md:pt-6">
    {#if screen}
      <div class="flex h-full flex-col rounded-card-inner bg-background p-3 md:p-4">
        {@render visual()}
      </div>
    {:else}
      {@render visual()}
    {/if}
  </div>
  <div class="p-4 md:p-6">
    {#if title}
      <h3 class="max-w-[40ch] text-card-title text-white">{title}</h3>
    {/if}
    {@render children?.()}
  </div>
</article>
