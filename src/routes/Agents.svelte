<script lang="ts">
  import { base } from "$app/paths"
  import { Badge, Button, StatBand } from "$lib/index.js"
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right"
  import Row from "./Row.svelte"
  import Section from "./Section.svelte"

  const repo = "https://github.com/engineio/ui"

  // Counted from the package this page imports, so they are true by
  // construction. No plus: these are exact, not floors.
  const figures = [
    { target: 3, label: "Brand colours" },
    { target: 20, label: "Primitives" },
    { target: 10, label: "Marketing components" },
    { target: 4, label: "Checks in CI" },
  ]

  const copy = `bun ../engine-ui/scripts/copy-into.ts packages/shared/src/lib/engine-ui
bun add bits-ui clsx tailwind-merge tailwind-variants @lucide/svelte`

  const setup = `@import "tailwindcss";
@import "./lib/engine-ui/styles/index.css";`

  const face = `<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet" />`

  const pointer =
    "UI follows the Engine design system. Read ../engine-ui/AGENTS.md\n(or https://engineio.github.io/ui/AGENTS.md) before writing or reviewing any UI."

  const checks = [
    { name: "Raw hex literals", why: "Every colour is a token. A literal is a colour nobody can find or change." },
    { name: "Tailwind's stock palette", why: "The brand has three colours and a grey ramp. A stock green is a status colour someone invented." },
    { name: "Retired sub-brand colours", why: "Originals Orange and Sportsbook Blue have no owner, so they are not available." },
    { name: "Emoji", why: "None, anywhere. The only sanctioned glyphs beyond letters and numbers are the close sign and the footnote mark." },
  ]

  const code =
    "w-full overflow-x-auto rounded-card-inner bg-grey-850 p-4 font-mono text-body leading-[1.6] whitespace-pre text-foreground"
</script>

<StatBand stats={figures} plus={false} caption="Counted from the source this page imports." class="mb-20" />

<Section
  title="AGENTS.md."
  note="Every rule on this page is in AGENTS.md, at the root of engineio/ui, beside the components it describes. The same file is served here at /AGENTS.md for a tool with no checkout."
>
  <Row label="Read it">
    <Button variant="inverse" href="{base}/AGENTS.md">AGENTS.md</Button>
    <Button variant="outline" href="{repo}#readme" target="_blank" rel="noopener">
      README <ArrowUpRight class="size-3.5" aria-hidden="true" /><span class="sr-only">Opens in a new tab.</span>
    </Button>
  </Row>
  <Row label="In a product's CLAUDE.md or AGENTS.md, one line does it">
    <pre class={code}>{pointer}</pre>
  </Row>
  <p class="max-w-[920px] text-body text-foreground">
    Point at the file. Do not copy the rules into a repo; the copy goes stale
    on the next change. The knowledge repo's brand skill carries the same
    pointer, so an agent in any Engine repo finds it.
  </p>
</Section>

<Section
  title="Setup."
  note="The components are a reference, not a dependency. Copy them into your product and own the copy: ENGINE-UI.md beside it records the upstream commit, so the next change is a git diff to port. The brand face is DM Sans from Google Fonts: the tokens name it and ship the fallback behind it, and you add the link to app.html. Skip that and the page renders in the fallback with no error."
>
  <Row label="Copy it in">
    <pre class={code}>{copy}</pre>
  </Row>
  <Row label="app.css">
    <pre class={code}>{setup}</pre>
  </Row>
  <Row label="app.html">
    <pre class={code}>{face}</pre>
  </Row>
</Section>

<Section
  title="CI checks."
  note="Four greps fail the build. All four happened in the products first."
>
  <div class="grid w-full gap-x-12 md:grid-cols-2">
    {#each checks as check (check.name)}
      <div class="flex items-start justify-between gap-4 border-b border-grey-800 py-4">
        <div>
          <p class="text-body font-semibold text-foreground">{check.name}</p>
          <p class="mt-1 text-body text-foreground">{check.why}</p>
        </div>
        <Badge variant="outline" class="shrink-0">ci</Badge>
      </div>
    {/each}
  </div>
</Section>

<Section
  title="Purpose."
  note="Engine surfaces are built by people and by agents. A rule written here once does not have to be rediscovered, and a component shipped here once does not have to be rebuilt. Where this page does not cover a case, choose the quieter option and flag the gap. Where it disagrees with the brand documents, the documents win."
/>
