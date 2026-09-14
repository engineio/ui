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
  <p class="text-small text-grey-300">{label}</p>
  <div class="flex flex-wrap items-center gap-3">
    {@render children?.()}
  </div>
</div>
