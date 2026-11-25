<script lang="ts">
  import type { Snippet } from "svelte"

  // A sub-block of one of the page's sections: an h3, a note, then the
  // specimens. No eyebrow and no rule above it — rhythm comes from the gap
  // between blocks being clearly larger than the gap inside one, which is
  // the page's own spacing rule applied to itself.
  let {
    title,
    note,
    children,
  }: {
    title: string
    note?: string
    children?: Snippet
  } = $props()

  const id = $derived(
    title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .replace(/\s+/g, "-"),
  )
</script>

<section {id} class="scroll-mt-anchor-sm md:scroll-mt-anchor [&+&]:mt-20">
  <h3 class="text-[24px] leading-[1.2] font-bold tracking-[-0.01em] text-foreground">
    {title}
  </h3>
  {#if note}
    <p class="mt-3 max-w-[920px] text-body text-foreground">
      {note}
    </p>
  {/if}
  <div class="mt-8 flex flex-col gap-8">
    {@render children?.()}
  </div>
</section>
