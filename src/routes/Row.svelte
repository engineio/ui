<script lang="ts">
  import type { Snippet } from "svelte"

  let {
    label,
    children,
  }: {
    label: string
    children?: Snippet
  } = $props()
</script>

<div class="flex flex-col gap-3">
  <p class="font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase">
    {label}
  </p>
  <div class="flex flex-wrap items-center gap-3">
    {@render children?.()}
  </div>
</div>
