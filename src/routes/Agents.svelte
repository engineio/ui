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

  const setup = `@import "./fonts.css";
@import "tailwindcss";
@import "@engineio/ui/styles";
@source "../node_modules/@engineio/ui/dist";

@theme {
  --font-brand: "ProximaNova", "Helvetica Neue", Arial, sans-serif;
}`

  const pointer =
    "UI is built on `@engineio/ui`. Read `node_modules/@engineio/ui/AGENTS.md`\nbefore writing or reviewing any UI."

  const checks = [
    { name: "Raw hex literals", why: "Every colour is a token. A literal is a colour nobody can find or change." },
    { name: "Tailwind's stock palette", why: "The brand has three colours and a grey ramp. A stock green is a status colour someone invented." },
    { name: "Retired sub-brand colours", why: "Originals Orange and Sportsbook Blue have no owner, so they are not available." },
    { name: "Emoji", why: "None, anywhere. The only sanctioned glyphs beyond letters and numbers are the close sign and the footnote mark." },
  ]

  const code =
    "w-full overflow-x-auto rounded-card-inner bg-grey-850 p-4 font-mono text-[13px] leading-[1.6] whitespace-pre text-foreground"
</script>

<StatBand stats={figures} plus={false} caption="Counted from the package this page imports." class="mb-20" />

<Section
  title="AGENTS.md."
  note="Every rule on this page is in AGENTS.md. It ships inside the package at node_modules/@engineio/ui/AGENTS.md and versions with the components. The same file is served here at /AGENTS.md for a tool with nothing installed."
>
  <Row label="Read it">
    <Button variant="inverse" href="{base}/AGENTS.md">AGENTS.md</Button>
    <Button variant="outline" href="{repo}#readme" target="_blank" rel="noopener">
      README <ArrowUpRight class="size-3.5" aria-hidden="true" /><span class="sr-only">Opens in a new tab.</span>
    </Button>
    <Button variant="ghost" href="https://www.npmjs.com/package/@engineio/ui" target="_blank" rel="noopener">
      npm <ArrowUpRight class="size-3.5" aria-hidden="true" /><span class="sr-only">Opens in a new tab.</span>
    </Button>
  </Row>
  <Row label="In a consumer's CLAUDE.md or AGENTS.md, one line does it">
    <pre class={code}>{pointer}</pre>
  </Row>
  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    Point at the path. Do not copy the rules into a repo; the copy goes stale
    on the next version. The repo also carries a Claude Code skill that is
    only that pointer.
  </p>
</Section>

<Section
  title="Setup."
  note="Tailwind 4 does not scan node_modules, so the @source line is required; without it the page half-styles with no error. No typeface ships, because the brand face is licensed and the package is public. Declare your own @font-face blocks and set the font tokens."
>
  <pre class={code}>{setup}</pre>
</Section>

<Section
  title="CI checks."
  note="Four greps fail the build. All four happened in the products first."
>
  <div class="grid w-full gap-x-12 md:grid-cols-2">
    {#each checks as check (check.name)}
      <div class="flex items-start justify-between gap-4 border-b border-grey-800 py-4">
        <div>
          <p class="text-[15px] font-semibold text-white">{check.name}</p>
          <p class="mt-1 text-[15px] leading-[1.5] text-foreground">{check.why}</p>
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
