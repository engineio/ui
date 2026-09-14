<script lang="ts">
  import {
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    EngineIcon,
    EngineWordmark,
  } from "$lib/index.js"
  import Row from "./Row.svelte"
  import Section from "./Section.svelte"

  const swatches = [
    { name: "Off Black", hex: "#0E0E0E", token: "background" },
    { name: "Pure White", hex: "#FFFFFF", token: "foreground" },
    { name: "Magenta", hex: "#FF006A", token: "primary" },
    { name: "Magenta Press", hex: "#D60059", token: "primary-press" },
  ]

  // Functional colour, not accents. Ink on every status fill is Off Black.
  // White fails AA on all three.
  const statusSwatches = [
    { name: "Success", hex: "#00C46A", token: "success", ink: "8.37:1" },
    { name: "Warning", hex: "#FFB020", token: "warning", ink: "10.56:1" },
    { name: "Danger", hex: "#FF3B30", token: "danger", ink: "5.44:1" },
  ]

  const greys = [
    "950",
    "900",
    "850",
    "800",
    "700",
    "600",
    "500",
    "400",
    "300",
    "200",
    "100",
    "050",
  ]

  const radii = [
    { name: "Tag", value: "6px", cls: "rounded-tag" },
    { name: "Field", value: "10px", cls: "rounded-field" },
    { name: "Media", value: "14px", cls: "rounded-media" },
    { name: "Card", value: "18px", cls: "rounded-card" },
    { name: "Frame", value: "26px", cls: "rounded-frame" },
    { name: "Control", value: "999px", cls: "rounded-control" },
  ]

  const type = [
    { role: "Display 1", cls: "text-[104px] leading-[0.94] tracking-[-0.02em] font-bold" },
    { role: "Display 2", cls: "text-[72px] leading-[0.94] tracking-[-0.02em] font-bold" },
    { role: "Headline", cls: "text-[52px] leading-[1.06] tracking-[-0.02em] font-bold" },
    { role: "H1", cls: "text-[40px] leading-[1.06] tracking-[-0.01em] font-bold" },
    { role: "H2", cls: "text-[30px] leading-[1.2] tracking-[-0.01em] font-bold" },
    { role: "H3", cls: "text-[24px] leading-[1.2] font-bold" },
    { role: "Subtitle", cls: "text-[20px] leading-[1.2] font-semibold" },
    { role: "Body", cls: "text-[15px] leading-[1.45]" },
    { role: "Caption", cls: "text-[13px] leading-[1.2] text-grey-300" },
  ]

  const rhythm = [56, 72, 96, 128]
  const groupSpace = [2, 4, 6, 8, 12, 16, 20, 24, 32, 40]

  const durations = [
    { name: "Instant", ms: "80ms", use: "Anything that should not be seen moving at all." },
    { name: "Fast", ms: "140ms", use: "Control states: hover, press, focus, the switch knob." },
    { name: "Base", ms: "220ms", use: "Surfaces: dialogs, popovers, the tab marker." },
    { name: "Slow", ms: "360ms", use: "Reveals on a product surface." },
    { name: "Reveal", ms: "640ms", use: "The longest move the brand allows." },
  ]

  const easings = [
    {
      token: "ease-brand",
      curve: "cubic-bezier(.2,0,.2,1)",
      use: "Control states, in and out.",
      cls: "ease-brand",
    },
    {
      token: "ease-brand-out",
      curve: "cubic-bezier(.16,1,.3,1)",
      use: "Entrances on surfaces and reveals.",
      cls: "ease-brand-out",
    },
    {
      token: "ease-brand-accelerate",
      curve: "cubic-bezier(.6,0,.3,1)",
      use: "Exits, and nothing else.",
      cls: "ease-brand-accelerate",
    },
  ]

  let motionRun = $state(false)
  let motionRuns = $state(0)

  const sentences = [
    {
      shape: "Claim + mechanism",
      example:
        "Accelerate Growth. The platform to build, publish and scale in the iGaming space.",
    },
    {
      shape: "Instruction + payoff",
      example:
        "Integrate once with Engine to grow your casino catalogue with tested and proven games.",
    },
    {
      shape: "Question + answer",
      example:
        "Thinking of growing your online casino offering? Engine Integration gives you access to over 2300 live games.",
    },
    { shape: "Numbers front-loaded", example: "Over 2300 live games." },
  ]

  const voicePairs = [
    {
      written: "Accelerate Growth.",
      avoid: "Accelerate growth!",
      why: "Headlines end in a full stop. The stop lands the claim; an exclamation mark undoes it.",
    },
    {
      written: "Build on Engine.",
      avoid: "We will help you build.",
      why: "Third person for Engine. Engine rarely says we.",
    },
    {
      written: "Your catalogue, live on every operator.",
      avoid: "The client catalogue, live on every operator.",
      why: "Second person for the customer.",
    },
    {
      written: "Colour, catalogue, favours, turbocharge.",
      avoid: "Color, catalog, favors.",
      why: "Spelling is British and Australian throughout.",
    },
    {
      written: "Publish Game",
      avoid: "PUBLISH GAME",
      why: "Title Case for headlines and controls. Uppercase is for small structural labels only.",
    },
  ]

  // Four of these are grep checks in CI. All four happened in the products
</script>

<Section
  title="Architecture."
  note="Engine is a B2B iGaming platform. The promise is speed. The platform is the product, not the player experience. Nothing here uses the visual language of a casino: no coins, no jackpots, no gold, no celebration."
>
  <Row label="Master brand">
    <div
      class="flex w-full flex-wrap items-center gap-8 rounded-frame border border-grey-700 px-8 py-7"
    >
      <EngineWordmark class="h-10" />
      <span class="h-8 w-px bg-grey-700"></span>
      <p class="max-w-[560px] text-[15px] leading-[1.45] text-grey-300">
        <span class="font-mono text-[13px] text-foreground">engine.io</span>
        owns everything above the two products: marketing, the corporate
        story, recruitment, stationery. Master-brand surfaces carry the
        wordmark, never a sub-brand lockup.
      </p>
    </div>
  </Row>

  <div class="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Engine Studio.</CardTitle>
        <CardDescription>
          Build and publish. Creators build games on Engine; Engine
          publishes them on Stake. Addresses creators and studios.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl class="flex flex-col gap-3 border-t border-grey-700 pt-5">
          <div class="flex gap-5">
            <dt
              class="w-[84px] shrink-0 text-small text-grey-300"
            >
              Home
            </dt>
            <dd class="font-mono text-[13px]">studio.engine.io</dd>
          </div>
          <div class="flex gap-5">
            <dt
              class="w-[84px] shrink-0 text-small text-grey-300"
            >
              Subject
            </dt>
            <dd class="text-[15px] text-grey-300">
              The machined and constructed. Rigs, keycaps, tooling.
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>

    <Card>
      <CardHeader>
        <CardTitle>Engine Integration.</CardTitle>
        <CardDescription>
          Distribution. Casinos integrate against Engine's docs, pull down
          Engine Studio games and run them on a revenue share. Addresses
          operators.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <dl class="flex flex-col gap-3 border-t border-grey-700 pt-5">
          <div class="flex gap-5">
            <dt
              class="w-[84px] shrink-0 text-small text-grey-300"
            >
              Home
            </dt>
            <dd class="font-mono text-[13px]">integration.engine.io</dd>
          </div>
          <div class="flex gap-5">
            <dt
              class="w-[84px] shrink-0 text-small text-grey-300"
            >
              Subject
            </dt>
            <dd class="text-[15px] text-grey-300">
              The connective. Pipework, manifolds, junctions.
            </dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  </div>

  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    Magenta is the accent on both. One accent per surface, never two.
  </p>

  <Row label="Naming">
    <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
      Write sub-brands in full on first use. Engine Studio, Engine
      Integration. Never abbreviate to ES or EI. Once a lockup has
      established which product is speaking, later references on the same
      surface may shorten to Studio or Integration. The master brand is
      Engine, never the Engine platform. Audiences do not mix: a Studio
      surface does not sell catalogue size, an Integration surface does not
      sell build tooling, and neither speaks to players.
    </p>
  </Row>

</Section>

<Section
  title="Marks."
  note="Vector artwork from the brand team, in the only two colourways the brand sanctions. Pure White for dark surfaces, Off Black for print and inverted panels. The wordmark is a custom soft-rounded face, not Proxima Nova. It is artwork, never set in type and never approximated. The figure mark is the turbo — the wordmark's g is retired as a standalone mark and does not come back."
>
  <Row label="Wordmark, for master brand surfaces">
    <EngineWordmark class="h-10" />
  </Row>
  <Row label="Figure mark, the turbo">
    <EngineIcon class="h-14" title="Engine" />
  </Row>
  <Row label="Secondary, on an inverted panel">
    <div class="flex items-center gap-8 rounded-card bg-foreground px-8 py-6">
      <EngineWordmark variant="secondary" class="h-10" />
      <EngineIcon variant="secondary" class="h-10" />
    </div>
  </Row>
  <Row label="Scale by height only, never both dimensions">
    <div class="flex items-end gap-8">
      <EngineIcon class="h-6" />
      <EngineIcon class="h-8" />
      <EngineIcon class="h-12" />
      <EngineIcon class="h-16" />
    </div>
  </Row>
  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    Colour is a two-value <span class="font-mono text-[13px]">variant</span>
    and not <span class="font-mono text-[13px]">currentColor</span>. With
    currentColor, any ancestor's text colour silently becomes brand colour,
    and a magenta wordmark is one careless
    <span class="font-mono text-[13px]">text-primary</span> away. Size by
    height alone. The brand forbids distortion, and neither the turbo's
    1001:1000 — square to the eye, not to the box — nor the wordmark's
    2001:732.5 is a ratio anybody reproduces by hand.
  </p>
</Section>

<Section
  title="Colour."
  note="The brand is three colours. Everything else is a neutral step between the outer two. One accent per surface, never two. No gradients, no coloured borders, no light theme."
>
  <Row label="Brand">
    {#each swatches as s (s.token)}
      <div class="w-[168px]">
        <div
          class="h-24 rounded-media border border-grey-700"
          style="background-color: {s.hex}"
        ></div>
        <p class="mt-2 text-[15px] font-semibold">{s.name}</p>
        <p class="font-mono text-[13px] text-grey-400">{s.hex}</p>
        <p class="font-mono text-[11px] text-grey-500">--color-{s.token}</p>
      </div>
    {/each}
  </Row>

  <Row label="Neutral ramp">
    <!--
      Swatch fills are set through the CSS variable rather than a
      `bg-grey-{g}` class: Tailwind scans for literal class strings, so a
      class name assembled from a loop variable is invisible to it and
      three of these twelve would silently render transparent.
    -->
    {#each greys as g (g)}
      <div class="w-[104px]">
        <div
          class="h-16 rounded-field border border-grey-700"
          style="background-color: var(--color-grey-{g})"
        ></div>
        <p class="mt-2 font-mono text-[11px] text-grey-400">grey-{g}</p>
      </div>
    {/each}
  </Row>

  <Row label="Status, functional only">
    {#each statusSwatches as s (s.token)}
      <div class="w-[168px]">
        <div
          class="flex h-24 items-end rounded-media p-3"
          style="background-color: {s.hex}"
        >
          <span class="text-[15px] font-bold text-background">
            {s.ink}
          </span>
        </div>
        <p class="mt-2 text-[15px] font-semibold">{s.name}</p>
        <p class="font-mono text-[13px] text-grey-400">{s.hex}</p>
        <p class="font-mono text-[11px] text-grey-500">--color-{s.token}</p>
      </div>
    {/each}
  </Row>
  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    Status is functional colour. It reports state and nothing else. It is
    never decoration, never a second accent, and never a stand-in for
    magenta. Ink on a status fill is always Off Black, because white fails
    AA on all three. There is no
    <span class="font-mono text-[13px]">info</span> colour. Use the neutral
    ramp for informational states.
  </p>
</Section>

<Section
  title="Typography."
  note="Proxima Nova only. Bold for display, Semibold for UI labels, Regular for body. Title Case for headlines, UPPERCASE only for small structural labels. No all-caps headlines, no italics, no other typefaces."
>
  <div class="flex w-full flex-col gap-6 overflow-x-auto">
    {#each type as t (t.role)}
      <div class="flex min-w-max items-baseline gap-8 border-b border-grey-800 pb-6">
        <p
          class="w-[120px] shrink-0 text-small text-grey-300"
        >
          {t.role}
        </p>
        <p class="{t.cls} whitespace-nowrap">Accelerate Growth.</p>
      </div>
    {/each}
    <div class="flex min-w-max items-baseline gap-8 border-b border-grey-800 pb-6">
      <p
        class="w-[120px] shrink-0 text-small text-grey-300"
      >
        Mono
      </p>
      <p class="font-mono text-[15px]">
        GAME_ID 7f3a91c2 · RTP 96.42% · 2300 live games
      </p>
    </div>
    <div class="flex min-w-max items-baseline gap-8 border-b border-grey-800 pb-6">
      <p
        class="w-[120px] shrink-0 text-small text-grey-300"
      >
        Condensed
      </p>
      <p class="font-condensed text-[64px] leading-[0.94] font-black">
        2300 Games.
      </p>
    </div>
    <div class="flex min-w-max items-baseline gap-8">
      <p
        class="w-[120px] shrink-0 text-small text-grey-300"
      >
        Extra Cond.
      </p>
      <p class="font-extra-condensed text-[64px] leading-[0.94] font-black">
        Momentum.
      </p>
    </div>
  </div>
  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    The two condensed cuts are for big numbers and poster-scale words only.
    Stat bands, lanyards, single-word statements. Never running text, and
    never below Black. Display type is large: 92 to 104px on a 1480px page.
    Scaling Display 1 down to 48px does not produce a smaller display size.
    It produces an H1.
  </p>
  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    Proxima Nova is commercially licensed. Where the licence does not reach,
    the substitute is <span class="font-mono text-[13px]">Inter</span>. Not
    a geometric display face and not a grotesque, because Proxima Nova is
    humanist with a tall x-height. JetBrains Mono carries every numeric,
    key, ID, code sample and eyebrow label.
  </p>
</Section>

<Section
  title="Shape."
  note="Radii by role, never mixed arbitrarily on one surface. The outer frame is always larger than the inner panel. Two border weights only: 1px hairline for structure, 1.5px for container rules."
>
  <Row label="Radii">
    {#each radii as r (r.name)}
      <div class="w-[128px]">
        <div class="h-20 border-[1.5px] border-grey-600 bg-grey-850 {r.cls}"></div>
        <p class="mt-2 text-[15px] font-semibold">{r.name}</p>
        <p class="font-mono text-[13px] text-grey-400">{r.value}</p>
      </div>
    {/each}
  </Row>

  <Row label="Border weights">
    <div class="w-[280px]">
      <div class="h-20 rounded-field border border-grey-700 bg-grey-850"></div>
      <p class="mt-2 text-[15px] font-semibold">Hairline</p>
      <p class="font-mono text-[13px] text-grey-400">1px · structure</p>
    </div>
    <div class="w-[280px]">
      <div class="h-20 rounded-card border-[1.5px] border-grey-600 bg-grey-850"></div>
      <p class="mt-2 text-[15px] font-semibold">Container rule</p>
      <p class="font-mono text-[13px] text-grey-400">1.5px · cards and panels</p>
    </div>
  </Row>

  <Row label="Nesting, outer frame always larger">
    <div class="rounded-frame border-[1.5px] border-grey-600 p-5">
      <div class="rounded-card border border-grey-700 p-5">
        <div
          class="flex h-24 w-[280px] items-center justify-center rounded-field bg-black"
        >
          <span
            class="text-small text-grey-400"
          >
            26 → 18 → 10
          </span>
        </div>
      </div>
    </div>
  </Row>

  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    Depth comes from rules and nested panels, not shadow. The package holds
    two shadow tokens,
    <span class="font-mono text-[13px]">--shadow-panel</span> and
    <span class="font-mono text-[13px]">--shadow-modal</span>, and both are
    for product chrome and modals. Neither belongs on a brand surface.
    Neither is a substitute for the rule that should have been there.
  </p>
</Section>

<Section
  title="Space."
  note="1480px page, 40px gutters, and 920px for anything anyone has to read. Spacing is 4px-based, with large jumps at 56 / 72 / 96 / 128 for section rhythm and 12 to 20px within a group. Rhythm comes from the gap between groups being clearly larger than the gap inside one."
>
  <Row label="Widths">
    <div class="flex w-full flex-col gap-5">
      <div class="flex flex-col gap-1 sm:flex-row sm:gap-6">
        <p
          class="w-[120px] shrink-0 text-small text-grey-300"
        >
          Page
        </p>
        <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
          1480px maximum, 40px gutters, 72px on large brand pages, for
          product surfaces. This page is not one: it sits on the 1180px
          marketing column described under Marketing.
        </p>
      </div>
      <div class="flex flex-col gap-1 sm:flex-row sm:gap-6">
        <p
          class="w-[120px] shrink-0 text-small text-grey-300"
        >
          Reading
        </p>
        <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
          920px, and this paragraph stops there. Body copy that runs the
          full 1480px is unreadable however correct the type scale is.
        </p>
      </div>
      <div class="flex flex-col gap-1 sm:flex-row sm:gap-6">
        <p
          class="w-[120px] shrink-0 text-small text-grey-300"
        >
          Brand page
        </p>
        <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
          1480 × 836. Slides and statement pages are drawn at that ratio.
        </p>
      </div>
      <div class="flex flex-col gap-1 sm:flex-row sm:gap-6">
        <p
          class="w-[120px] shrink-0 text-small text-grey-300"
        >
          Card
        </p>
        <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
          20px padding, 28px on the large variant.
        </p>
      </div>
    </div>
  </Row>

  <Row label="Section rhythm, the large jumps">
    <div class="flex w-full flex-col gap-3">
      {#each rhythm as sp (sp)}
        <div class="flex items-center gap-5">
          <p class="w-[56px] shrink-0 font-mono text-[13px] text-grey-400">
            {sp}px
          </p>
          <div class="h-3 bg-primary" style="width: {sp}px"></div>
        </div>
      {/each}
    </div>
  </Row>

  <Row label="Within a group">
    {#each groupSpace as sp (sp)}
      <div class="flex min-w-[32px] flex-col items-center gap-2">
        <div class="h-12 bg-primary" style="width: {sp}px"></div>
        <p class="font-mono text-[11px] text-grey-400">{sp}</p>
      </div>
    {/each}
  </Row>

  <Row label="Signature composition, big type flush to a bottom corner">
    <div
      class="relative aspect-[1480/836] w-full max-w-[720px] overflow-hidden rounded-frame border border-grey-700 bg-grey-950"
    >
      <div class="absolute inset-x-6 top-3.5 h-px bg-grey-700"></div>
      <p
        class="absolute bottom-8 left-8 max-w-[80%] text-[52px] leading-[0.94] font-bold tracking-[-0.02em]"
      >
        Accelerate Growth.
      </p>
    </div>
  </Row>

  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    The hairline sits 14px from the top, inset 24px each side, and the type
    is set flush to the bottom-left instead of centred. That is the deck's
    signature composition. Centring it is the most common way a page stops
    looking like Engine.
  </p>

</Section>

<Section
  title="Motion."
  note="Fast and mechanical, to match the promise of speed. 140ms for control states, 220ms for surfaces, 360 to 640ms for reveals. Entrances ease out, exits accelerate, presses scale to 0.98. Never bounce, never spring, never parallax, never a looping decorative animation."
>
  <Row label="Durations">
    <div class="flex w-full flex-col">
      {#each durations as d (d.ms)}
        <div class="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-grey-800 py-4">
          <p
            class="w-[120px] shrink-0 text-small text-grey-300"
          >
            {d.name}
          </p>
          <p class="w-[72px] shrink-0 font-mono text-[15px]">{d.ms}</p>
          <p class="text-[15px] text-grey-300">{d.use}</p>
        </div>
      {/each}
    </div>
  </Row>

  <Row label="Easings, run side by side">
    <Button
      variant="outline"
      onclick={() => {
        motionRun = !motionRun
        motionRuns += 1
      }}
    >
      Run
    </Button>
    <span class="text-[15px] text-grey-300">
      Same distance, same 640ms, three curves.
    </span>
  </Row>

  <div class="flex w-full flex-col gap-4">
    {#each easings as e (e.token)}
      <div class="flex flex-wrap items-center gap-5">
        <div class="w-[200px] shrink-0">
          <p class="font-mono text-[13px]">{e.token}</p>
          <p class="font-mono text-[11px] text-grey-500">{e.curve}</p>
        </div>
        <div
          class="relative h-10 min-w-[280px] flex-1 rounded-field border border-grey-800 bg-grey-850"
        >
          <div
            class="absolute top-1 h-8 w-8 rounded-tag bg-primary transition-[left] duration-[640ms] {e.cls}"
            style="left: {motionRun ? 'calc(100% - 36px)' : '4px'}"
          ></div>
        </div>
        <p class="w-[220px] shrink-0 text-[15px] text-grey-300">{e.use}</p>
      </div>
    {/each}
  </div>

  <Row label="Reveal, 8px up with a fade and never further">
    <div class="rounded-card border border-grey-700 px-8 py-7">
      {#key motionRuns}
        <p class="reveal text-[30px] leading-[1.2] font-bold tracking-[-0.01em]">
          Make Ambition Move Faster.
        </p>
      {/key}
    </div>
  </Row>

  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    Motion is fast, but it is never mandatory.
    <span class="font-mono text-[13px]">prefers-reduced-motion</span> drops
    everything to fades, and the package's base layer already does that
    globally. A product importing
    <span class="font-mono text-[13px]">@engineio/ui/styles</span> gets it
    without writing a line. Turn the setting on and press Run again. The
    blocks jump, and nothing on this page breaks.
  </p>
</Section>

<Section
  title="Imagery."
  note="Black-and-white photographs and renders of machined objects: turbines, rigs, pipework, schematics, keycaps. Cool, hard, high-contrast, slightly clinical. Some frames read as technical drawings with faint annotation type. Occasionally one tiny point of magenta light in an otherwise monochrome frame, and no more than one."
>
  <Row label="Treatment: 14px crop, badge top-right, scrim under type">
    <div class="grid w-full gap-6 md:grid-cols-2">
      <figure
        class="relative aspect-[16/10] overflow-hidden rounded-media border border-grey-800 bg-grey-950"
      >
        <div class="absolute inset-0 flex items-center justify-center">
          <p
            class="text-small text-grey-500"
          >
            Rigs · Keycaps · Tooling
          </p>
        </div>
        <span class="absolute top-[38%] left-[28%] h-1.5 w-1.5 rounded-control bg-primary"></span>
        <div class="absolute top-4 right-4">
          <Badge variant="secondary">Engine Studio</Badge>
        </div>
        <div
          class="absolute inset-x-0 bottom-0 h-1/2"
          style="background: linear-gradient(to top, rgba(10,10,10,.92) 0%, rgba(10,10,10,.6) 38%, rgba(10,10,10,0) 100%)"
        ></div>
        <figcaption
          class="absolute bottom-5 left-5 text-[24px] leading-[1.2] font-bold"
        >
          Build. Publish.
        </figcaption>
      </figure>

      <figure
        class="relative aspect-[16/10] overflow-hidden rounded-media border border-grey-800 bg-grey-950"
      >
        <div class="absolute inset-0 flex items-center justify-center">
          <p
            class="text-small text-grey-500"
          >
            Pipework · Manifolds · Junctions
          </p>
        </div>
        <div class="absolute top-4 right-4">
          <Badge variant="secondary">Engine Integration</Badge>
        </div>
        <div
          class="absolute inset-x-0 bottom-0 h-1/2"
          style="background: linear-gradient(to top, rgba(10,10,10,.92) 0%, rgba(10,10,10,.6) 38%, rgba(10,10,10,0) 100%)"
        ></div>
        <figcaption
          class="absolute bottom-5 left-5 text-[24px] leading-[1.2] font-bold"
        >
          Integrate Once.
        </figcaption>
      </figure>
    </div>
  </Row>

  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    Never people. Never warm tones. Never stock-office imagery. No
    handshakes, no laptops, no meeting rooms. Always cropped into a rounded
    rectangle at the media radius or bled to the page edge, with the
    sub-brand badge top-right. Type over photography gets the bottom-up
    black scrim, not a capsule and not a box. Subject leans by sub-brand and
    the grade never does. Studio takes the machined and constructed,
    Integration the connective, both monochrome.
  </p>

  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    The two frames hold no photography. None ships in this package, and
    filling them with a stand-in would put an image into the design system
    that the brand never approved. The scrim under the type is the only
    gradient the brand permits. Backgrounds are one of three things, and
    photography is the third: flat Off Black, flat white for print and
    letterhead, or full-bleed monochrome. No patterns, no textures, no
    illustration, no noise.
  </p>
</Section>

<Section
  title="Voice."
  note="Declarative, mechanical, confident. Short sentences that end in a full stop, headlines included. Second person for the customer, third person for Engine. Engine rarely says we. Register is plain and commercial: no showmanship, no exclamation marks."
>
  <Row label="Sentence shapes">
    <div class="flex max-w-[920px] flex-col">
      {#each sentences as v (v.shape)}
        <div class="flex flex-col gap-2 border-b border-grey-800 py-5">
          <p
            class="text-small text-grey-300"
          >
            {v.shape}
          </p>
          <p class="text-[18px] leading-[1.45]">{v.example}</p>
        </div>
      {/each}
    </div>
  </Row>

  <Row label="Engine writes, and does not">
    <div class="flex w-full flex-col">
      <div class="flex flex-col gap-2 border-b border-grey-700 pb-3 md:flex-row md:gap-8">
        <p
          class="md:w-[220px] lg:w-[300px] shrink-0 text-small text-grey-300"
        >
          Written
        </p>
        <p
          class="md:w-[220px] lg:w-[300px] shrink-0 text-small text-grey-300"
        >
          Not written
        </p>
        <p
          class="text-small text-grey-300"
        >
          Why
        </p>
      </div>
      {#each voicePairs as v (v.written)}
        <div class="flex flex-col gap-2 border-b border-grey-800 py-4 md:flex-row md:gap-8">
          <p class="md:w-[220px] lg:w-[300px] shrink-0 text-[15px] leading-[1.45]">
            {v.written}
          </p>
          <p class="md:w-[220px] lg:w-[300px] shrink-0 text-[15px] leading-[1.45] text-grey-500">
            {v.avoid}
          </p>
          <p class="text-[15px] leading-[1.45] text-grey-300">{v.why}</p>
        </div>
      {/each}
    </div>
  </Row>

  <p class="max-w-[920px] text-[15px] leading-[1.5] text-foreground">
    No emoji. Anywhere. Not in brand material, not in product UI, not in
    copy, and not in a commit message that ends up in release notes. The
    only non-alphanumeric glyphs the brand sanctions are the multiplication
    sign for a close control and the brand's asterisk for footnotes. This is
    the one voice rule with a grep behind it. CI scans the source and fails
    the build, because a design system that only asks nicely gets one
    eventually.
  </p>
</Section>
