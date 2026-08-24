<script lang="ts">
  // Imported HERE rather than in +layout.ts on purpose. From the layout
  // component, SvelteKit puts a real <link rel="stylesheet"> in the
  // prerendered HTML; from the universal load module the stylesheet is only
  // reachable through the JS entry, so a static page flashes unstyled before
  // hydration. The engine repo imports app.css from +layout.ts, which is
  // survivable there because nothing is prerendered.
  import "../app.css"

  let { children } = $props()
</script>

<div class="min-h-screen bg-background text-foreground">
  {@render children?.()}
</div>
