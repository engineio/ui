<script lang="ts">
  import { onMount } from "svelte"
  import { Segmented, segmentVariants, themes, type ThemeName } from "$lib/index.js"

  let current = $state<ThemeName>("engine-magenta")

  onMount(() => {
    current = (document.documentElement.dataset.theme as ThemeName) ?? "engine-magenta"
  })

  function pick(name: ThemeName) {
    current = name
    document.documentElement.dataset.theme = name
    try {
      localStorage.setItem("engine-ui-theme", name)
    } catch {}
  }
</script>

<Segmented class="fixed right-4 bottom-4 z-40 shadow-panel" aria-label="Theme">
  {#each themes as theme (theme.name)}
    <button
      type="button"
      class={segmentVariants({ active: current === theme.name })}
      aria-pressed={current === theme.name}
      onclick={() => pick(theme.name)}
    >
      {theme.label}
    </button>
  {/each}
</Segmented>
