<script lang="ts">
  import { base } from "$app/paths"
  import {
    Button,
    EngineIcon,
    EngineWordmark,
    Hero,
    Marquee,
    SectionHead,
    SiteFooter,
    SiteHeader,
    TooltipProvider,
    type MarqueeItem,
  } from "$lib/index.js"
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right"
  import Agents from "./Agents.svelte"
  import Brand from "./Brand.svelte"
  import Components from "./Components.svelte"
  import DoNot from "./DoNot.svelte"
  import MarketingKit from "./MarketingKit.svelte"

  // The design system's own page, built on the design system — on the
  // marketing formula it documents, with the components it ships. Everything
  // rendered here imports the package, so what renders is what a product
  // gets, at the version in the header.

  const repo = "https://github.com/engineio/ui"
  const agentsFile = `${base}/AGENTS.md`

  const surfaces: MarqueeItem[] = [
    "Engine Studio",
    "Engine Integration",
    "engine.io",
    "The approval queue",
    "Insights",
    "Provably fair",
    "The operator portal",
    "Studio docs",
  ].map((name) => ({ src: name.toLowerCase().replace(/[^a-z]/g, ""), alt: name }))

  const footerColumns = [
    {
      heading: "System",
      links: [
        { name: "Brand", href: "#brand" },
        { name: "Components", href: "#components" },
        { name: "Marketing", href: "#marketing" },
        { name: "For agents", href: "#agents" },
        { name: "Do not", href: "#do-not" },
      ],
    },
    {
      heading: "Read",
      links: [
        { name: "AGENTS.md", href: agentsFile },
        { name: "README", href: `${repo}#readme` },
        { name: "Migration guide", href: `${repo}/blob/main/MIGRATION.md` },
      ],
    },
    {
      heading: "Engine",
      links: [
        { name: "engine.io", href: "https://engine.io" },
        { name: "Engine Integration", href: "https://integration.engine.io" },
        { name: "GitHub", href: repo },
        { name: "npm", href: "https://www.npmjs.com/package/@engineio/ui" },
      ],
    },
  ]

  const section = "reveal scroll-mt-anchor-sm md:scroll-mt-anchor"
</script>

<svelte:head>
  <title>Engine design system.</title>
  <meta
    name="description"
    content="Tokens, components and the landing page formula for every Engine surface, published as @engineio/ui. The rules ship with the package as AGENTS.md so the tools that build Engine surfaces read the same ones."
  />
</svelte:head>

{#snippet surfaceTile(entry: MarqueeItem)}
  <span
    class="block whitespace-nowrap text-[17px] font-semibold text-grey-300 opacity-75 transition-opacity duration-220 ease-brand hover:opacity-100"
  >
    {entry.alt}
  </span>
{/snippet}

<TooltipProvider>
  <div class="min-h-dvh bg-background text-white antialiased">
    <SiteHeader
      label="Engine design system"
      home="{base}/"
      links={[
        { name: "Brand", href: "#brand" },
        { name: "Components", href: "#components" },
        { name: "Marketing", href: "#marketing" },
        { name: "For agents", href: "#agents" },
      ]}
      action={{ name: "GitHub", href: repo, external: true }}
    >
      {#snippet brand()}
        <EngineIcon class="h-8 md:hidden" title={undefined} />
        <EngineWordmark class="h-9 max-md:hidden" title={undefined} />
      {/snippet}
    </SiteHeader>

    <main class="mx-auto min-w-0 max-w-marketing">
      <Hero
        title="The Engine Design System."
        standfirst="Tokens, components and the landing page formula for every Engine surface, published as @engineio/ui. Everything on this page is the shipped component. The rules ship with it as AGENTS.md, so the tools that build Engine surfaces read the same ones."
      >
        {#snippet actions()}
          <Button variant="inverse" size="lg" href={agentsFile} class="max-sm:w-full">Read AGENTS.md</Button>
          <Button variant="outline" size="lg" href={repo} target="_blank" rel="noopener" class="max-sm:w-full">
            GitHub <ArrowUpRight class="size-4" aria-hidden="true" /><span class="sr-only">Opens in a new tab.</span>
          </Button>
        {/snippet}
      </Hero>

      <Marquee label="Surfaces on the system" items={surfaces} item={surfaceTile} />

      <div class="px-gutter pb-section">
        <section id="brand" class={section}>
          <SectionHead
            title="Brand."
            lead="The rules every Engine surface follows: architecture, marks, colour, type, shape, space, motion, imagery and voice."
          />
          <Brand />
        </section>

        <section id="components" class={section}>
          <SectionHead
            title="Components."
            lead="Twenty primitives from the package. Add a variant in your product by extending the exported variant map. Do not fork one."
          />
          <Components />
        </section>

        <section id="marketing" class={section}>
          <SectionHead
            title="Marketing."
            lead="The landing page formula: an 1180px column, four text sizes, a glass header, and motion that plays once and lands on its end state. This page uses it."
          />
          <MarketingKit />
        </section>

        <section id="agents" class={section}>
          <SectionHead
            title="For agents."
            lead="The rules ship inside the package as AGENTS.md. Point your tools at it. This exists to help automation converge on one system, not to enforce a style."
          />
          <Agents />
        </section>

        <section id="do-not" class={section}>
          <DoNot />
        </section>
      </div>
    </main>

    <SiteFooter
      tagline="Tokens, components and the landing page formula for every Engine surface."
      columns={footerColumns}
      legal={[
        { name: __DS_VERSION__, href: `${repo}/releases` },
        { name: "MIT licence", href: `${repo}/blob/main/LICENSE` },
      ]}
    >
      {#snippet brand()}
        <a href="{base}/" aria-label="Engine design system" class="w-fit">
          <EngineWordmark class="h-9" title={undefined} />
        </a>
      {/snippet}
    </SiteFooter>
  </div>
</TooltipProvider>
