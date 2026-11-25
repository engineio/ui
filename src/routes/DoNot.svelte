<script lang="ts">
  import { Badge, SectionHead } from "$lib/index.js"

  // Four of these are grep checks in CI. All four happened in the products
  // first.
  const prohibitions = [
    { rule: "No gradients, glows or coloured shadows. The scrim over photography is the one exception.", ci: false },
    { rule: "No two accents on one surface.", ci: false },
    { rule: "No colour outside the three brand colours, the neutral ramp and the three status colours.", ci: true },
    { rule: "No info colour. Use the neutral ramp for informational states.", ci: true },
    { rule: "No raw hex literals in component source. Use a token.", ci: true },
    { rule: "No body copy in magenta, and no magenta text below 15px bold.", ci: false },
    { rule: "No drop shadows on cards or brand surfaces.", ci: false },
    { rule: "No coloured left border to indicate category or ownership.", ci: false },
    { rule: "No setting the wordmark in a typeface, and no approximating it in a lookalike.", ci: false },
    { rule: "No all-caps headlines. No italics. No other typefaces.", ci: false },
    { rule: "No emoji, illustration, textures, patterns or noise.", ci: true },
    { rule: "No photography of people, no warm tones, no stock office scenes.", ci: false },
    { rule: "No `dark:` variants. A component names a role; the theme decides its value.", ci: false },
    { rule: "No casino iconography. No coins, chips, jackpots, gold or celebration.", ci: false },
    { rule: "No scaling display type down to 48px and calling it display.", ci: false },
  ]
</script>

<SectionHead
  title="Do not."
  lead="The prohibitions in one list. Four are grep checks in CI and fail the build."
/>
<div class="grid w-full gap-x-12 md:grid-cols-2">
  {#each prohibitions as pr (pr.rule)}
    <div class="flex items-start justify-between gap-4 border-b border-grey-800 py-4">
      <p class="text-body">{pr.rule}</p>
      {#if pr.ci}
        <Badge variant="outline" class="shrink-0">ci</Badge>
      {/if}
    </div>
  {/each}
</div>
<p class="mt-8 max-w-[920px] text-body text-foreground">
  When something is not covered here, choose the option that is quieter and
  more mechanical. That resolves most of what this list does not.
</p>
