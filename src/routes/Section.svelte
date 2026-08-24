<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    title,
    eyebrow,
    note,
    children,
  }: {
    title: string
    eyebrow: string
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

<section {id} class="border-t border-grey-700 py-14 first:border-t-0">
  <p
    class="mb-3 font-mono text-[11px] font-semibold tracking-[0.08em] text-grey-400 uppercase"
  >
    {eyebrow}
  </p>
  <h2 class="text-[30px] leading-[1.2] font-bold tracking-[-0.01em]">
    {title}
  </h2>
  {#if note}
    <p class="mt-3 max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
      {note}
    </p>
  {/if}
  <div class="mt-8 flex flex-col gap-8">
    {@render children?.()}
  </div>
</section>
