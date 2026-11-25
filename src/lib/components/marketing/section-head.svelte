<script lang="ts">
  import { cn } from "../../utils.js"
  import type { Snippet } from "svelte"

  // A section's heading and lead, with the section rhythm above it.
  //
  // `mt-section` is the gap between one block and the next heading —
  // clamp(88px, 12vw, 160px), 80px on phones — and the twelve-pixel-rounded
  // 48px below it is the gap to the section's own content. Rhythm on a
  // landing comes from this gap being clearly larger than any gap inside a
  // block; if a page feels cramped, the fix is here, not inside the blocks.
  //
  // The h2 is sentence case with a full stop, 26ch at most, balanced. The
  // lead is one or two sentences, 52ch. The landings carried an uppercase
  // eyebrow above the h2 for a while and removed every one: on a page with
  // four sizes of type an eyebrow is a fifth, and it reads as a label on
  // something that does not need labelling.

  let {
    title,
    lead,
    class: className,
    children,
  }: {
    /** Sentence case, full stop. */
    title: string
    lead?: string
    class?: string
    children?: Snippet
  } = $props()
</script>

<div class={cn("mt-section mb-12 max-md:mt-20 max-md:mb-8", className)}>
  <h2 class="max-w-[26ch] text-section text-balance text-foreground">{title}</h2>
  {#if lead}
    <p class="mt-5 max-w-[52ch] text-lead text-foreground">{lead}</p>
  {/if}
  {@render children?.()}
</div>
