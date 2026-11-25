<script lang="ts">
  import {
    BentoCard,
    BentoGrid,
    Button,
    EngineIcon,
    EngineWordmark,
    Hero,
    Marquee,
    SectionHead,
    SiteBanner,
    SiteHeader,
    StatBand,
    Tour,
    type MarqueeItem,
    type TourStep,
  } from "$lib/index.js"
  import Check from "@lucide/svelte/icons/check"
  import { flip } from "svelte/animate"
  import { cubicOut } from "svelte/easing"
  import { fade, fly } from "svelte/transition"
  import Row from "./Row.svelte"
  import Section from "./Section.svelte"

  // Every demo below renders the shipped marketing components with invented
  // content. Names follow the brand's imagery rule: machined objects, never a
  // real studio or operator.

  const marketingColumn = [
    { token: "--container-marketing", value: "1180px", use: "max-w-marketing — the column. Content starts at x=194 on 1440." },
    { token: "--spacing-gutter", value: "clamp(20px, 5vw, 64px)", use: "px-gutter — the side padding, fluid." },
    { token: "--spacing-section", value: "clamp(88px, 12vw, 160px)", use: "mt-section, pb-section — the gap before every h2." },
    { token: "--spacing-header / -sm", value: "72px / 64px", use: "h-header, -top-header — the glass bar, and where hero art starts." },
    { token: "--spacing-anchor / -sm", value: "120px / 96px", use: "scroll-mt-anchor — header plus breathing room for #links." },
    { token: "--blur-glass", value: "20px", use: "glass — 65% page colour over the blur, always on." },
  ]

  const marketingType = [
    { cls: "text-hero", spec: "clamp(38px, 5vw, 64px) · 1.02 · −0.02em · 700", sample: "A Modern Take on the Traditional Aggregator.", cap: "max-w-[18ch]" },
    { cls: "text-section", spec: "clamp(28px, 3.2vw, 44px) · 1.06 · −0.02em · 700", sample: "Every operator and every creator is on the same simplified contract.", cap: "max-w-[26ch]" },
    { cls: "text-standfirst", spec: "clamp(18px, 1.5vw, 22px) · 1.5", sample: "One contract, one invoice, completely standardised behind one integration. Forget the negotiations and focus on what actually matters. Apply and go live today.", cap: "max-w-[54ch]" },
    { cls: "text-lead", spec: "clamp(17px, 1.4vw, 20px) · 1.5", sample: "You just need to pay the invoice, and we will settle with the creators.", cap: "max-w-[52ch]" },
    { cls: "text-card-title", spec: "17px · 1.35 · 600", sample: "Near real-time analytics, see exactly how the integration is performing.", cap: "max-w-[40ch]" },
    { cls: "text-stat", spec: "42px · 0.94 · 900 · tabular", sample: "9.7B", cap: "" },
    { cls: "text-body", spec: "16px · 1.5 · every caption, label and line of sub text", sample: "Platform-wide totals, live from engine.io.", cap: "" },
    { cls: "text-nav", spec: "16px · 1.25 · every navigation item, or larger", sample: "How it works", cap: "" },
  ]

  const motionTimings = [
    { name: "--motion-reveal", ms: "700ms", use: "rise — an element arriving on a scene." },
    { name: "--motion-stagger", ms: "140ms", use: "Between siblings, multiplied by --i." },
    { name: "--motion-fill", ms: "1400ms", use: "sweep — a gauge or split bar filling." },
    { name: "--motion-settle", ms: "3000ms", use: "settle, swap — the confirmation, once the screen has been read." },
    { name: "--motion-swap", ms: "300ms", use: "The outgoing half of a swap, and every fade-out." },
    { name: "--motion-pulse", ms: "2400ms", use: "live-dot — one breath." },
    { name: "--motion-step", ms: "8000ms", use: "One Tour step." },
    { name: "--motion-beat", ms: "3000ms", use: "The bento metronome. One card moves per beat." },
  ]

  let grammarRuns = $state(0)

  const marqueeItems: MarqueeItem[] = [
    "Northwind",
    "Bolt & Bracket",
    "Millwright",
    "Anvil Works",
    "Cold Forge",
    "Keycap",
    "Manifold",
    "Turbine",
  ].map((name) => ({ src: name.toLowerCase().replace(/[^a-z]/g, ""), alt: name }))

  const tourSteps: TourStep[] = [
    {
      id: "apply",
      title: "Apply.",
      body: "Sign in and tell us about you as an operator.",
      nav: "",
      url: "/welcome",
      callout: {
        title: "Application.",
        body: "Your name, your website and a few lines on what you do.",
        path: "Sign in / Apply for access",
      },
    },
    {
      id: "limits",
      title: "Set Your Exposure Limits.",
      body: "The most one round can pay out, and the most one bet can cost. Change them whenever you like.",
      nav: "Settings",
      url: "/northwind/settings#limits",
      callout: {
        title: "Exposure limits.",
        body: "Any bet that exceeds your set limits is automatically blocked.",
        path: "Settings / Exposure limits",
      },
    },
    {
      id: "invoice",
      title: "Pay One Invoice.",
      body: "At month end, one itemised invoice for every game you ran.",
      nav: "Accounting",
      url: "/northwind/accounting#invoices",
      callout: {
        title: "Invoice.",
        body: "One invoice a month, itemised per game.",
        path: "Accounting / Invoices",
      },
    },
  ]
  const tourNav = ["Dashboard", "Games", "Bets", "Accounting", "Settings"]
  let tourIndex = $state(0)

  const bentoRows = [
    { name: "Turbine Rush", by: "Northwind", value: "$575M" },
    { name: "Keycap Clash", by: "Bolt & Bracket", value: "$298M" },
    { name: "Pipework", by: "Millwright", value: "$273M" },
    { name: "Cold Forge", by: "Anvil Works", value: "$112M" },
    { name: "Manifold", by: "Millwright", value: "$109M" },
    { name: "Gantry", by: "Northwind", value: "$66M" },
  ]
  let rowOffset = $state(0)
  let invoiceCycle = $state(0)
  const bentoWindow = $derived(
    Array.from({ length: 4 }, (_, i) => bentoRows[(rowOffset + i) % bentoRows.length]).filter(
      (row): row is (typeof bentoRows)[number] => row !== undefined,
    ),
  )
  const bentoBars = [38, 44, 41, 52, 58, 49, 63, 66, 60, 72, 69, 78, 84, 91]

  const proofStats = [
    { target: 3800, label: "Games built on Engine" },
    { target: 1100, label: "Creators on Engine" },
    { target: 9.7, decimals: 1, suffix: "B", label: "Bets processed" },
    { target: 23, prefix: "$", suffix: "B", label: "Turnover processed" },
  ]
</script>

{#snippet marqueeTile(entry: MarqueeItem)}
  <span class="block whitespace-nowrap text-[17px] font-semibold text-grey-300 opacity-75 transition-opacity duration-220 ease-brand hover:opacity-100">
    {entry.alt}
  </span>
{/snippet}

{#snippet screen(s: TourStep)}
  {#if s.id === "apply"}
    <div class="mx-auto flex h-full max-w-[400px] flex-col md:justify-center">
      <p class="text-[15px] font-bold tracking-[-0.01em] text-foreground">Apply for access.</p>
      <p class="mt-1 text-[11px] leading-[1.45] text-grey-300">Tell us who you are. The Engine team reviews every application.</p>
      <div class="mt-4 flex flex-col gap-3">
        <div class="rise flex flex-col gap-1" style="--i: 1">
          <span class="text-[11px] text-foreground">Your name</span>
          <span class="flex min-h-8 items-center rounded-field bg-grey-850 px-2.5 text-[11px] text-foreground">Jane Doe</span>
        </div>
        <div class="rise flex flex-col gap-1" style="--i: 2">
          <span class="text-[11px] text-foreground">Company website</span>
          <span class="flex min-h-8 items-center rounded-field bg-grey-850 px-2.5 text-[11px] text-foreground">https://northwind.example</span>
        </div>
      </div>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <span class="rise inline-flex h-8 items-center rounded-control bg-foreground px-3.5 text-[12px] font-semibold text-background" style="--i: 4">Submit application</span>
        <span class="settle flex items-center gap-1.5 text-[11px] text-grey-300"><Check class="size-3 text-foreground" />Received. Under review.</span>
      </div>
    </div>
  {:else if s.id === "limits"}
    <div class="flex h-full flex-col">
      <p class="text-[15px] font-bold tracking-[-0.01em] text-foreground">Exposure limits.</p>
      <p class="mt-1 text-[11px] leading-[1.45] text-grey-300">Caps for every game you run. Save and they apply immediately.</p>
      <div class="mt-4 grid grid-cols-2 gap-3 max-md:grid-cols-1">
        <div class="rise rounded-card-inner bg-card p-4" style="--i: 1">
          <span class="text-[11px] text-foreground">Maximum exposure</span>
          <p class="mt-2 text-[18px] leading-none tabular-nums text-foreground">100,000.00 <span class="text-[11px] text-grey-400">USD</span></p>
          <span class="mt-3 block h-1 w-full overflow-hidden rounded-full bg-grey-700">
            <span class="sweep block h-full w-[72%] rounded-full bg-primary" style="--i: 2"></span>
          </span>
        </div>
        <div class="rise rounded-card-inner bg-card p-4" style="--i: 2">
          <span class="text-[11px] text-foreground">Maximum bet cost</span>
          <p class="mt-2 text-[18px] leading-none tabular-nums text-foreground">500.00 <span class="text-[11px] text-grey-400">USD</span></p>
          <span class="mt-3 block h-1 w-full overflow-hidden rounded-full bg-grey-700">
            <span class="sweep block h-full w-[38%] rounded-full bg-primary" style="--i: 3"></span>
          </span>
        </div>
      </div>
      <div class="mt-4 flex flex-wrap items-center gap-3">
        <span class="rise inline-flex h-8 items-center rounded-control bg-foreground px-3.5 text-[12px] font-semibold text-background" style="--i: 4">Save exposure limits</span>
        <span class="settle flex items-center gap-1.5 text-[11px] text-grey-300"><Check class="size-3 text-foreground" />Saved.</span>
      </div>
    </div>
  {:else}
    <div class="flex h-full w-full flex-col md:max-w-[360px] md:justify-center">
      <div class="rise rounded-card-inner bg-card p-4" style="--i: 0">
        <div class="flex items-start justify-between gap-3">
          <div>
            <span class="text-[11px] text-foreground">Invoice</span>
            <p class="mt-0.5 text-[13px] text-foreground">INV-2026-09</p>
          </div>
          <span class="rounded-tag bg-primary-tint-12 px-2 py-1 text-[10px] text-primary-300">Due in 20 days</span>
        </div>
        <ul class="mt-3 flex flex-col divide-y divide-grey-700 text-[10px]">
          {#each [["Turbine Rush", "905.13"], ["Keycap Clash", "658.85"], ["Pipework", "504.41"]] as [name, amount], j (name)}
            <li class="rise flex justify-between py-1.5" style="--i: {j + 2}">
              <span class="text-[11px] text-grey-300">{name}</span>
              <span class="tabular-nums text-foreground">{amount}</span>
            </li>
          {/each}
        </ul>
        <div class="mt-3 flex items-baseline justify-between">
          <span class="text-[11px] text-foreground">Total due</span>
          <span class="text-[16px] tabular-nums text-foreground">2,068.39 <span class="text-[10px] text-grey-400">USD</span></span>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-3">
          <span class="rise inline-flex h-8 items-center rounded-control bg-foreground px-3.5 text-[12px] font-semibold text-background" style="--i: 6">Pay invoice</span>
          <span class="settle flex items-center gap-1.5 text-[11px] text-grey-300"><Check class="size-3 text-foreground" />Paid.</span>
        </div>
      </div>
    </div>
  {/if}
{/snippet}

<Section
  title="Page."
  note="A logged-out landing is read once, top to bottom, by a stranger. It is narrower than a product page, breathes more and says less per screen. The two Engine landings settled this formula in September 2026 and calibrated it against stripe.com: an 1180px column, fluid gutters and rhythm, a glass header with no rules, a left-aligned hero with the art to its right, and a logo marquee before the first section."
>
  <Row label="Column and rhythm">
    <div class="flex w-full flex-col">
      {#each marketingColumn as t (t.token)}
        <div class="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-grey-800 py-4">
          <p class="w-[240px] shrink-0 font-mono text-body">{t.token}</p>
          <p class="w-[220px] shrink-0 font-mono text-body text-grey-300">{t.value}</p>
          <p class="text-body text-grey-300">{t.use}</p>
        </div>
      {/each}
    </div>
  </Row>

  <Row label="Banner, header, hero and marquee, as shipped">
    <div class="w-full overflow-hidden rounded-frame border border-grey-700 bg-background">
      <SiteBanner href="https://engine.io" cta="Go to Engine Studio">
        Are you a creator? Games are built and published on Engine Studio.
      </SiteBanner>
      <SiteHeader
        label="Engine Integration"
        home="#page"
        class="static"
        links={[
          { name: "How it works", href: "#tour" },
          { name: "Commercials", href: "#bento" },
          { name: "Apply", href: "#agents" },
        ]}
        action={{ name: "Sign in", href: "#page" }}
      >
        {#snippet brand()}
          <EngineIcon class="h-8 md:hidden" title={undefined} />
          <EngineWordmark class="h-9 max-md:hidden" title={undefined} />
        {/snippet}
      </SiteHeader>
      <div class="mx-auto max-w-marketing">
        <Hero
          level={2}
          title="A Modern Take on the Traditional Aggregator."
          standfirst="Thousands of publishers, one contract, one invoice, completely standardised behind one integration. Forget the negotiations and focus on what actually matters. Apply and go live today."
        >
          {#snippet actions()}
            <Button variant="inverse" size="lg" href="#agents" class="max-sm:w-full">Apply for access</Button>
            <Button variant="outline" size="lg" href="#tour" class="max-sm:w-full">Learn how it works</Button>
          {/snippet}
        </Hero>
        <Marquee label="Creators on Engine" items={marqueeItems} item={marqueeTile} />
      </div>
    </div>
  </Row>

  <p class="max-w-[920px] text-body text-foreground">
    The header is `static` here only so the gallery can scroll past it. On
    a page it is sticky and the hero's art layer starts at its top edge, so
    the render shows through the glass at rest. The marquee takes real
    logos as images — white on transparent, fitted to one box — and this
    one renders text tiles through the `item` snippet.
  </p>
</Section>

<Section
  title="Type."
  note="Four sizes and a standfirst, each a whole spec on one utility: size, leading, tracking and weight together, so text-hero is the h1 and not a font size. Headings are capped in ch and balanced. Base text is white; grey is reserved for meaning."
>
  <div class="flex w-full flex-col">
    {#each marketingType as t (t.cls)}
      <div class="flex flex-col gap-3 border-b border-grey-800 py-6 lg:flex-row lg:gap-8">
        <div class="w-[260px] shrink-0">
          <p class="font-mono text-body">{t.cls}</p>
          <p class="mt-1 font-mono text-body text-grey-500">{t.spec}</p>
          {#if t.cap}
            <p class="mt-1 font-mono text-body text-grey-500">{t.cap}</p>
          {/if}
        </div>
        <p class="{t.cls} {t.cap} text-balance {t.cls === 'text-stat' ? 'tabular-nums' : ''}">
          {t.sample}{#if t.cls === "text-stat"}<span class="text-primary">+</span>{/if}
        </p>
      </div>
    {/each}
  </div>
  <p class="max-w-[920px] text-body text-foreground">
    No uppercase, no mono and no eyebrows on a landing. The page has four
    sizes of type; a tracked label is a fifth. Inside a mock screen the
    scale drops again — 15px bold titles, 11 to 13px text, 10px tags —
    because a mock is a picture of a product, not the page.
  </p>
</Section>

<Section
  title="Motion grammar."
  note="A mock screen is a scene. Its elements rise in 140ms apart, fills sweep from the left, bars climb from the bottom, and three seconds in — once the reader has taken it in — the confirmation settles and a pending tag swaps to done. Every utility is global, honours prefers-reduced-motion by landing on its end state, and can be held paused by a motion-gate until the block is on screen."
>
  <Row label="Timings">
    <div class="flex w-full flex-col">
      {#each motionTimings as t (t.name)}
        <div class="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-grey-800 py-4">
          <p class="w-[200px] shrink-0 font-mono text-body">{t.name}</p>
          <p class="w-[72px] shrink-0 font-mono text-body">{t.ms}</p>
          <p class="text-body text-grey-300">{t.use}</p>
        </div>
      {/each}
    </div>
  </Row>

  <Row label="The scene, replayed">
    <Button variant="outline" onclick={() => (grammarRuns += 1)}>Run</Button>
    <span class="text-body text-grey-300">Fields rise, the gauge sweeps, the tag swaps at three seconds.</span>
  </Row>

  {#key grammarRuns}
    <div class="w-full max-w-[560px] rounded-card bg-card p-4 md:p-6">
      <div class="flex flex-col rounded-card-inner bg-background p-4">
        <div class="flex items-center justify-between">
          <p class="text-[15px] font-bold tracking-[-0.01em] text-foreground">Exposure limits.</p>
          <span class="grid [&>*]:col-start-1 [&>*]:row-start-1">
            <span class="swap-out rounded-tag bg-primary-tint-12 px-2 py-1 text-[10px] whitespace-nowrap text-primary-300">Unsaved</span>
            <span class="swap-in flex items-center justify-center gap-1 rounded-tag bg-grey-850 px-2 py-1 text-[10px] text-foreground">
              <Check class="size-3" />Saved
            </span>
          </span>
        </div>
        <div class="mt-4 grid grid-cols-2 gap-3">
          <div class="rise rounded-card-inner bg-card p-3" style="--i: 1">
            <span class="text-[11px] text-foreground">Maximum exposure</span>
            <p class="mt-2 text-[18px] leading-none tabular-nums text-foreground">
              100,000.00 <span class="text-[11px] text-grey-400">USD</span>
            </p>
            <span class="mt-3 block h-1 w-full overflow-hidden rounded-full bg-grey-700">
              <span class="sweep block h-full w-[72%] rounded-full bg-primary" style="--i: 2"></span>
            </span>
          </div>
          <div class="rise rounded-card-inner bg-card p-3" style="--i: 2">
            <span class="text-[11px] text-foreground">Maximum bet cost</span>
            <p class="mt-2 text-[18px] leading-none tabular-nums text-foreground">
              500.00 <span class="text-[11px] text-grey-400">USD</span>
            </p>
            <span class="mt-3 block h-1 w-full overflow-hidden rounded-full bg-grey-700">
              <span class="sweep block h-full w-[38%] rounded-full bg-primary" style="--i: 3"></span>
            </span>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap items-center gap-3">
          <span class="rise inline-flex h-8 items-center rounded-control bg-foreground px-3.5 text-[12px] font-semibold text-background" style="--i: 4">
            Save exposure limits
          </span>
          <span class="settle flex items-center gap-1.5 text-[11px] text-grey-300">
            <Check class="size-3 text-foreground" />Saved.
          </span>
          <span class="ml-auto flex items-center gap-1.5 text-[11px] text-grey-300">
            <span class="live-dot size-1.5 rounded-full bg-primary"></span>Live
          </span>
        </div>
      </div>
    </div>
  {/key}

  <p class="max-w-[920px] text-body text-foreground">
    Rules learned the expensive way. Nothing plays until it is on screen.
    Rotating rows never use <span class="font-mono text-body">rise</span>
    — the stagger leaves a hole — they use Svelte fly, flip and fade. A
    <span class="font-mono text-body">reveal</span> is opacity only,
    because a translate on it makes every anchor scroll land short. And
    when several things on a page rotate they share one beat and take
    turns, so only one thing is ever moving.
  </p>
</Section>

<Section
  title="Tour."
  note="The Stripe-style product walkthrough. A numbered step list beside a browser-frame mock, one screen per step, one callout hanging off the frame's corner, advancing on the progress bar's own animationend every eight seconds and paused while off screen. The shell is the component; the screens are yours, built from the motion grammar."
>
  <Tour steps={tourSteps} navItems={tourNav} org="Northwind" host="integration.engine.io" bind:index={tourIndex} {screen} />
  <p class="max-w-[920px] text-body text-foreground">
    Clicking a step is the only control — no hover pause, no pause button,
    both tried and removed. The mock is decorative; the step list and the
    callout carry everything it shows. Under reduced motion the timer is
    off, not fast: a 0.01ms fill would advance every step in one frame.
  </p>
</Section>

<Section
  title="Bento."
  note="Six columns from lg: a wide card spans three, a narrow one two. Each card is a cropped product mock over one sentence. The grid holds every scene paused until a quarter of it is on screen, then starts them together, and ticks one shared 3s beat so rotating cards take turns."
>
  <BentoGrid
    onbeat={(n) => {
      if (n % 2 === 0) rowOffset = (rowOffset + 1) % bentoRows.length
      else invoiceCycle += 1
    }}
  >
    <BentoCard span={3} title="One agreement for every operator and every creator.">
      {#snippet visual()}
        <div class="my-auto">
          <div class="grid grid-cols-3 gap-3">
            <div class="rise" style="--i: 1">
              <span class="text-[12px] text-foreground">You keep</span>
              <p class="mt-1.5 text-[26px] leading-none tabular-nums text-foreground md:text-[32px]">93%</p>
            </div>
            <div class="rise" style="--i: 2">
              <span class="text-[12px] text-foreground">Creators</span>
              <p class="mt-1.5 text-[26px] leading-none tabular-nums text-foreground md:text-[32px]">5%</p>
            </div>
            <div class="rise" style="--i: 3">
              <span class="text-[12px] text-foreground">Engine</span>
              <p class="mt-1.5 text-[26px] leading-none tabular-nums text-foreground md:text-[32px]">2%</p>
            </div>
          </div>
          <span class="mt-6 flex h-2 w-full gap-px overflow-hidden rounded-full" aria-hidden="true">
            <span class="sweep block h-full w-[93%] bg-primary" style="--i: 4"></span>
            <span class="sweep block h-full w-[5%] bg-primary-press" style="--i: 5"></span>
            <span class="sweep block h-full w-[2%] bg-primary-300" style="--i: 6"></span>
          </span>
        </div>
      {/snippet}
    </BentoCard>

    <BentoCard span={3} title="Near real-time analytics, see exactly how the integration is performing.">
      {#snippet visual()}
        <span class="text-[12px] text-foreground">Top games, past 30 days</span>
        <ul class="mt-3 flex flex-col gap-1.5">
          {#each bentoWindow as row (row.name)}
            <li
              class="flex items-center gap-3 rounded-card-inner bg-card px-3 py-2"
              animate:flip={{ duration: 700, easing: cubicOut }}
              in:fly={{ y: 8, duration: 600, easing: cubicOut }}
              out:fade={{ duration: 300 }}
            >
              <span class="min-w-0 flex-1 truncate text-[12px] text-foreground">
                {row.name} <span class="text-[11px] text-grey-400">by {row.by}</span>
              </span>
              <span class="text-[11px] tabular-nums text-foreground">{row.value}</span>
            </li>
          {/each}
        </ul>
      {/snippet}
    </BentoCard>

    <BentoCard title="Simplified billing. One invoice a month, then Engine settles with the creators.">
      {#snippet visual()}
        {#key invoiceCycle}
          <div class="flex h-full flex-col" in:fade={{ duration: 600 }}>
            <div class="flex items-center justify-between gap-3">
              <p class="text-[13px] text-foreground">INV-2026-{String(7 + (invoiceCycle % 3)).padStart(2, "0")}</p>
              <span class="grid [&>*]:col-start-1 [&>*]:row-start-1">
                <span class="swap-out rounded-tag bg-primary-tint-12 px-2 py-1 text-[10px] whitespace-nowrap text-primary-300">Due in 20 days</span>
                <span class="swap-in flex items-center justify-center gap-1 rounded-tag bg-grey-850 px-2 py-1 text-[10px] text-foreground"><Check class="size-3" />Paid</span>
              </span>
            </div>
            <div class="rise mt-6 flex flex-col gap-1.5" style="--i: 1">
              <span class="text-[12px] text-foreground">Total due, 7% of GGR</span>
              <span class="text-[26px] leading-none tabular-nums text-foreground md:text-[32px]">
                28,845.60 <span class="text-[12px] text-grey-400">USD</span>
              </span>
            </div>
            <div class="mt-6 flex items-center gap-3">
              <span class="rise inline-flex h-8 items-center rounded-control bg-foreground px-3.5 text-[12px] font-semibold whitespace-nowrap text-background" style="--i: 2">Pay invoice</span>
              <span class="settle flex items-center gap-1.5 text-[11px] text-grey-300"><Check class="size-3 text-foreground" />Creators settled.</span>
            </div>
          </div>
        {/key}
      {/snippet}
    </BentoCard>

    <BentoCard title="GGR per day, for every game you run.">
      {#snippet visual()}
        <div class="flex items-center justify-between">
          <span class="text-[12px] text-foreground">GGR per day</span>
          <span class="flex items-center gap-1.5 text-[11px] text-grey-300">
            <span class="live-dot size-1.5 rounded-full bg-primary"></span>Live
          </span>
        </div>
        <div class="mt-3 flex min-h-0 flex-1 items-end gap-1">
          {#each bentoBars as h, j (j)}
            <span
              class="climb block flex-1 {j === bentoBars.length - 1 ? 'bg-primary' : 'bg-grey-700'}"
              style="height: {h}%; --i: {j}"
            ></span>
          {/each}
        </div>
      {/snippet}
    </BentoCard>

    <BentoCard title="A catalogue of network games as soon as you integrate." screen={false}>
      {#snippet visual()}
        <div class="relative h-full overflow-hidden rounded-card-inner bg-background">
          <div class="absolute inset-0 [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
            <ul class="absolute top-1/2 left-4 flex h-[144px] -translate-y-1/2 gap-2.5">
              {#each bentoRows as row, j (row.name)}
                <li class="rise grid aspect-[3/4] w-[108px] shrink-0 place-items-center rounded-card-inner bg-card px-2 text-center text-[10px] leading-tight text-grey-300" style="--i: {j}">
                  {row.name}
                </li>
              {/each}
            </ul>
          </div>
        </div>
      {/snippet}
    </BentoCard>
  </BentoGrid>
  <p class="max-w-[920px] text-body text-foreground">
    The screen runs off the card's bottom edge on purpose — design the mock
    to be cut. Two surfaces and no borders: card over page, page colour
    inside. One sentence per card, as an h3, with a full stop; the mock
    shows the thing and the sentence names it.
  </p>
</Section>

<Section
  title="Proof."
  note="Four figures that count up on sight, each with a magenta plus. The plus is a promise — it says at least this — so floor the figures before passing them, never round up. The caption says where the numbers come from and when."
>
  <SectionHead
    class="mt-0"
    title="The infrastructure behind Engine is already powering serious volume."
    lead="Proven and reliable at scale. Engine already powers Stake, the largest casino in the world."
  />
  <StatBand stats={proofStats} caption="Platform-wide totals as of September 2026. Games are released per operator." />
  <p class="max-w-[920px] text-body text-foreground">
    SectionHead above it is the h2 and lead every section opens with, and
    <span class="font-mono text-body">mt-section</span> is the rhythm
    between blocks — here overridden to zero because the gallery section
    already spaced it. Sentence case, a full stop, 26ch, balanced. No
    eyebrow above it; the landings removed every one.
  </p>
</Section>
