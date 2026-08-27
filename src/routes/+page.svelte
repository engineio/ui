<script lang="ts">
  import {
    Alert,
    AlertDescription,
    AlertTitle,
    Badge,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Checkbox,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    EngineIcon,
    EngineWordmark,
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Progress,
    RadioGroup,
    RadioGroupItem,
    ResponsiveDialog,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogFooter,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
    ResponsiveDialogTrigger,
    Separator,
    Skeleton,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Textarea,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/index.js"
  import Row from "./Row.svelte"
  import Section from "./Section.svelte"

  let switchOn = $state(true)
  let checked = $state(true)
  let radio = $state("studio")
  let dialogOpen = $state(false)
  let adaptiveOpen = $state(false)
  let sheetOpen = $state(false)
  let popoutOpen = $state(false)

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

  const contents = [
    {
      part: "Brand",
      items: [
        ["Architecture", "architecture"],
        ["Marks", "marks"],
        ["Colour", "colour"],
        ["Typography", "typography"],
        ["Shape", "shape"],
        ["Space", "space"],
        ["Motion", "motion"],
        ["Imagery", "imagery"],
        ["Voice", "voice"],
      ],
    },
    {
      part: "Components",
      items: [
        ["Button", "button"],
        ["Badge", "badge"],
        ["Alert", "alert"],
        ["Fields", "fields"],
        ["Controls", "controls"],
        ["Card", "card"],
        ["Tabs", "tabs"],
        ["Overlays", "overlays"],
        ["Table", "table"],
        ["Skeleton and Separator", "skeleton-and-separator"],
      ],
    },
    {
      part: "Reference",
      items: [["Do not", "do-not"]],
    },
  ]

  // Section rhythm, then the steps used inside a group. Bar widths are set
  // through an inline style for the same reason the grey swatches are: a
  // width assembled from a loop variable is invisible to Tailwind's scanner.
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
    { rule: "No light-mode variant.", ci: false },
    { rule: "No casino iconography. No coins, chips, jackpots, gold or celebration.", ci: false },
    { rule: "No scaling display type down to 48px and calling it display.", ci: false },
  ]

</script>

<TooltipProvider>
  <div class="mx-auto max-w-[1480px] px-10 py-16">
    <header class="pb-14">
      <div class="mb-6 flex items-center gap-4">
        <EngineWordmark class="h-8" />
        <span class="h-6 w-px bg-grey-700"></span>
        <p
          class="font-mono text-[11px] font-semibold tracking-[0.08em] text-grey-400 uppercase"
        >
          Design System · {__DS_VERSION__}
        </p>
      </div>
      <h1 class="max-w-[920px] text-[72px] leading-[0.94] font-bold tracking-[-0.02em]">
        One system. Every surface.
      </h1>
      <p class="mt-6 max-w-[920px] text-[18px] leading-[1.45] text-grey-300">
        The brand and the code that carries it, on one page. Architecture,
        colour, type, shape, space, motion, imagery and voice are the rules.
        The twenty primitives after them are those rules compiled, published as
        <span class="font-mono text-[16px] text-foreground">@engineio/ui</span>.
        Every component below is the shipped component. This page imports the
        package, so what renders here is what a product gets.
      </p>

      <nav class="mt-12 flex flex-col gap-5 border-t border-grey-800 pt-8">
        {#each contents as group (group.part)}
          <div class="flex flex-col gap-2 sm:flex-row sm:gap-8">
            <p
              class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-500 uppercase"
            >
              {group.part}
            </p>
            <div class="flex flex-wrap gap-x-6 gap-y-2">
              {#each group.items as [label, id] (id)}
                <a
                  href="#{id}"
                  class="text-[15px] text-grey-300 transition-colors duration-[140ms] ease-brand hover:text-foreground"
                >
                  {label}
                </a>
              {/each}
            </div>
          </div>
        {/each}
      </nav>
    </header>

    <Section
      eyebrow="Brand 01"
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
                  class="w-[84px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
                >
                  Home
                </dt>
                <dd class="font-mono text-[13px]">studio.engine.io</dd>
              </div>
              <div class="flex gap-5">
                <dt
                  class="w-[84px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
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
                  class="w-[84px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
                >
                  Home
                </dt>
                <dd class="font-mono text-[13px]">integration.engine.io</dd>
              </div>
              <div class="flex gap-5">
                <dt
                  class="w-[84px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
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

      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        Magenta is the accent on both. One accent per surface, never two.
      </p>

      <Row label="Naming">
        <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
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
      eyebrow="Brand 02"
      title="Marks."
      note="Vector artwork from the brand team, in the only two colourways the brand sanctions. Pure White for dark surfaces, Off Black for print and inverted panels. The wordmark is a custom soft-rounded face, not Proxima Nova. It is artwork, never set in type and never approximated."
    >
      <Row label="Wordmark, for master brand surfaces">
        <EngineWordmark class="h-10" />
      </Row>
      <Row label="Figure mark">
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
      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        Colour is a two-value <span class="font-mono text-[13px]">variant</span>
        and not <span class="font-mono text-[13px]">currentColor</span>. With
        currentColor, any ancestor's text colour silently becomes brand colour,
        and a magenta wordmark is one careless
        <span class="font-mono text-[13px]">text-primary</span> away. Size by
        height alone. The brand forbids distortion, and neither the 810:1000
        nor the 2000:536 ratio is one anybody reproduces by hand.
      </p>
    </Section>

    <Section
      eyebrow="Brand 03"
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
      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        Status is functional colour. It reports state and nothing else. It is
        never decoration, never a second accent, and never a stand-in for
        magenta. Ink on a status fill is always Off Black, because white fails
        AA on all three. There is no
        <span class="font-mono text-[13px]">info</span> colour. Use the neutral
        ramp for informational states.
      </p>
    </Section>

    <Section
      eyebrow="Brand 04"
      title="Typography."
      note="Proxima Nova only. Bold for display, Semibold for UI labels, Regular for body. Title Case for headlines, UPPERCASE only for small structural labels. No all-caps headlines, no italics, no other typefaces."
    >
      <div class="flex flex-col gap-6">
        {#each type as t (t.role)}
          <div class="flex items-baseline gap-8 border-b border-grey-800 pb-6">
            <p
              class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
            >
              {t.role}
            </p>
            <p class={t.cls}>Accelerate Growth.</p>
          </div>
        {/each}
        <div class="flex items-baseline gap-8 border-b border-grey-800 pb-6">
          <p
            class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
          >
            Mono
          </p>
          <p class="font-mono text-[15px]">
            GAME_ID 7f3a91c2 · RTP 96.42% · 2300 live games
          </p>
        </div>
        <div class="flex items-baseline gap-8 border-b border-grey-800 pb-6">
          <p
            class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
          >
            Condensed
          </p>
          <p class="font-condensed text-[64px] leading-[0.94] font-black">
            2300 Games.
          </p>
        </div>
        <div class="flex items-baseline gap-8">
          <p
            class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
          >
            Extra Cond.
          </p>
          <p class="font-extra-condensed text-[64px] leading-[0.94] font-black">
            Momentum.
          </p>
        </div>
      </div>
      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        The two condensed cuts are for big numbers and poster-scale words only.
        Stat bands, lanyards, single-word statements. Never running text, and
        never below Black. Display type is large: 92 to 104px on a 1480px page.
        Scaling Display 1 down to 48px does not produce a smaller display size.
        It produces an H1.
      </p>
      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        Proxima Nova is commercially licensed. Where the licence does not reach,
        the substitute is <span class="font-mono text-[13px]">Inter</span>. Not
        a geometric display face and not a grotesque, because Proxima Nova is
        humanist with a tall x-height. JetBrains Mono carries every numeric,
        key, ID, code sample and eyebrow label.
      </p>
    </Section>

    <Section
      eyebrow="Brand 05"
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
                class="font-mono text-[11px] tracking-[0.08em] text-grey-500 uppercase"
              >
                26 → 18 → 10
              </span>
            </div>
          </div>
        </div>
      </Row>

      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        Depth comes from rules and nested panels, not shadow. The package holds
        two shadow tokens,
        <span class="font-mono text-[13px]">--shadow-panel</span> and
        <span class="font-mono text-[13px]">--shadow-modal</span>, and both are
        for product chrome and modals. Neither belongs on a brand surface.
        Neither is a substitute for the rule that should have been there.
      </p>
    </Section>

    <Section
      eyebrow="Brand 06"
      title="Space."
      note="1480px page, 40px gutters, and 920px for anything anyone has to read. Spacing is 4px-based, with large jumps at 56 / 72 / 96 / 128 for section rhythm and 12 to 20px within a group. Rhythm comes from the gap between groups being clearly larger than the gap inside one."
    >
      <Row label="Widths">
        <div class="flex w-full flex-col gap-5">
          <div class="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <p
              class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
            >
              Page
            </p>
            <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
              1480px maximum, 40px gutters, 72px on large brand pages. This
              page is set to exactly that, so the frame around you is the spec.
            </p>
          </div>
          <div class="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <p
              class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
            >
              Reading
            </p>
            <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
              920px, and this paragraph stops there. Body copy that runs the
              full 1480px is unreadable however correct the type scale is.
            </p>
          </div>
          <div class="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <p
              class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
            >
              Brand page
            </p>
            <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
              1480 × 836. Slides and statement pages are drawn at that ratio.
            </p>
          </div>
          <div class="flex flex-col gap-1 sm:flex-row sm:gap-6">
            <p
              class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
            >
              Card
            </p>
            <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
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

      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        The hairline sits 14px from the top, inset 24px each side, and the type
        is set flush to the bottom-left instead of centred. That is the deck's
        signature composition. Centring it is the most common way a page stops
        looking like Engine.
      </p>

    </Section>

    <Section
      eyebrow="Brand 07"
      title="Motion."
      note="Fast and mechanical, to match the promise of speed. 140ms for control states, 220ms for surfaces, 360 to 640ms for reveals. Entrances ease out, exits accelerate, presses scale to 0.98. Never bounce, never spring, never parallax, never a looping decorative animation."
    >
      <Row label="Durations">
        <div class="flex w-full flex-col">
          {#each durations as d (d.ms)}
            <div class="flex flex-wrap items-baseline gap-x-6 gap-y-1 border-b border-grey-800 py-4">
              <p
                class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
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

      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
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
      eyebrow="Brand 08"
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
                class="font-mono text-[11px] tracking-[0.08em] text-grey-600 uppercase"
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
                class="font-mono text-[11px] tracking-[0.08em] text-grey-600 uppercase"
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

      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        Never people. Never warm tones. Never stock-office imagery. No
        handshakes, no laptops, no meeting rooms. Always cropped into a rounded
        rectangle at the media radius or bled to the page edge, with the
        sub-brand badge top-right. Type over photography gets the bottom-up
        black scrim, not a capsule and not a box. Subject leans by sub-brand and
        the grade never does. Studio takes the machined and constructed,
        Integration the connective, both monochrome.
      </p>

      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
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
      eyebrow="Brand 09"
      title="Voice."
      note="Declarative, mechanical, confident. Short sentences that end in a full stop, headlines included. Second person for the customer, third person for Engine. Engine rarely says we. Register is plain and commercial: no showmanship, no exclamation marks."
    >
      <Row label="Sentence shapes">
        <div class="flex max-w-[920px] flex-col">
          {#each sentences as v (v.shape)}
            <div class="flex flex-col gap-2 border-b border-grey-800 py-5">
              <p
                class="font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
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
          <div class="flex flex-col gap-2 border-b border-grey-700 pb-3 sm:flex-row sm:gap-8">
            <p
              class="w-[300px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
            >
              Written
            </p>
            <p
              class="w-[300px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
            >
              Not written
            </p>
            <p
              class="font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
            >
              Why
            </p>
          </div>
          {#each voicePairs as v (v.written)}
            <div class="flex flex-col gap-2 border-b border-grey-800 py-4 sm:flex-row sm:gap-8">
              <p class="w-[300px] shrink-0 text-[15px] leading-[1.45]">
                {v.written}
              </p>
              <p class="w-[300px] shrink-0 text-[15px] leading-[1.45] text-grey-500">
                {v.avoid}
              </p>
              <p class="text-[15px] leading-[1.45] text-grey-300">{v.why}</p>
            </div>
          {/each}
        </div>
      </Row>

      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        No emoji. Anywhere. Not in brand material, not in product UI, not in
        copy, and not in a commit message that ends up in release notes. The
        only non-alphanumeric glyphs the brand sanctions are the multiplication
        sign for a close control and the brand's asterisk for footnotes. This is
        the one voice rule with a grep behind it. CI scans the source and fails
        the build, because a design system that only asks nicely gets one
        eventually.
      </p>
    </Section>

    <Section
      eyebrow="Component 01"
      title="Button."
      note="Pill controls at 32 / 40 / 48px, Bold 15px labels, 140ms mechanical transitions, a 0.98 press and a 2px magenta focus ring. Tab through them. The ring is never removed."
    >
      <Row label="Variants">
        <Button>Publish Game</Button>
        <Button variant="inverse">Publish Game</Button>
        <Button variant="secondary">Publish Game</Button>
        <Button variant="outline">Publish Game</Button>
        <Button variant="ghost">Publish Game</Button>
        <Button variant="destructive">Delete Game</Button>
        <Button variant="link">View Docs</Button>
      </Row>
      <Row label="Sizes">
        <Button size="sm">Small</Button>
        <Button>Default</Button>
        <Button size="lg">Large</Button>
      </Row>
      <Row label="States">
        <Button loading>Publishing</Button>
        <Button disabled>Disabled</Button>
      </Row>
    </Section>

    <Section
      eyebrow="Component 02"
      title="Badge."
      note="One chip for every job, in the soft repository-label treatment: tinted fill, matching ink, 6px radius. Fills are translucent by design, so a chip reads the same on the page, on a card and on a table tile."
    >
      <Row label="Brand and neutral">
        <Badge>featured</Badge>
        <Badge variant="secondary">documentation</Badge>
        <Badge variant="outline">archived</Badge>
      </Row>
      <Row label="Status, functional only">
        <Badge variant="success">certified</Badge>
        <Badge variant="warning">needs review</Badge>
        <Badge variant="danger">blocked</Badge>
      </Row>
      <Row label="The same chips on a card surface">
        <div class="flex flex-wrap items-center gap-3 rounded-card bg-card p-5">
          <Badge>featured</Badge>
          <Badge variant="secondary">documentation</Badge>
          <Badge variant="outline">archived</Badge>
          <Badge variant="success">certified</Badge>
          <Badge variant="danger">blocked</Badge>
        </div>
      </Row>
      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        There is no solid variant. An opaque fill can only be right on one
        surface, and these chips have to read on the page, on a card and in a
        table cell. The status variants are functional, not categorical. Reach
        for <span class="font-mono text-[13px]">success</span> when something
        has succeeded, never because green suited the row. The brand chip's ink
        is <span class="font-mono text-[13px]">primary-300</span> and not pure
        magenta, because magenta on its own tint is 4.37:1 and the brand forbids
        magenta text below 15px bold.
      </p>
    </Section>

    <Section
      eyebrow="Component 03"
      title="Alert."
      note="The panel is always neutral. A 3px bar down the left edge is the only thing that says good, bad or warning. The fill, the rule and the type never change. A column of alerts reads as one surface with state down its side, not as four different components."
    >
      <div class="flex max-w-[560px] flex-col gap-3">
        <Alert variant="success" onDismiss={() => {}}>
          <AlertTitle>Game published.</AlertTitle>
          <AlertDescription>Live on 12 operators.</AlertDescription>
        </Alert>
        <Alert variant="warning" onDismiss={() => {}}>
          <AlertTitle>Approval expires in 3 days.</AlertTitle>
          <AlertDescription>
            Resubmit the maths certificate to keep the listing active.
          </AlertDescription>
        </Alert>
        <Alert variant="danger" onDismiss={() => {}}>
          <AlertTitle>Upload failed.</AlertTitle>
          <AlertDescription>Asset bundle exceeded 250 MB.</AlertDescription>
        </Alert>
        <Alert>
          <AlertTitle>Build queued.</AlertTitle>
          <AlertDescription>
            The bundle enters the approval queue once its checksum is verified.
          </AlertDescription>
        </Alert>
      </div>
      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        The bar is <span class="font-mono text-[13px]">aria-hidden</span>, so
        the title has to carry the message with the colour ignored entirely.
        "Upload failed." beats "Error." The neutral variant takes a grey bar
        instead of none, so a mixed stack keeps its left edge. Pass
        <span class="font-mono text-[13px]">onDismiss</span> to get the close
        control, and omit it for a static alert.
      </p>
    </Section>

    <Section
      eyebrow="Component 04"
      title="Fields."
      note="40px height, 10px radius, 1px hairline border on the grey ramp. Focus swaps the border to magenta and adds the ring. All three share the `field` utility, so the focus treatment is defined exactly once."
    >
      <div class="grid max-w-[920px] gap-6 sm:grid-cols-2">
        <div class="flex flex-col gap-2">
          <Label for="game-name">Game Name</Label>
          <Input id="game-name" placeholder="Sweet Bonanza" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="rtp">Target RTP</Label>
          <Input id="rtp" value="96.42" />
        </div>
        <div class="flex flex-col gap-2 sm:col-span-2">
          <Label for="notes">Release Notes</Label>
          <Textarea id="notes" placeholder="What changed in this build." rows={4} />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="invalid">Invalid State</Label>
          <Input id="invalid" value="not-a-number" aria-invalid="true" />
        </div>
        <div class="flex flex-col gap-2">
          <Label for="disabled">Disabled</Label>
          <Input id="disabled" value="Locked" disabled />
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Component 05"
      title="Controls."
      note="Checkbox at 18px with a 6px radius, radio as an 18px circle, switch as a 44 × 24 track. Magenta fill when on, knob travels in 140ms."
    >
      <Row label="Switch">
        <Switch bind:checked={switchOn} />
        <span class="text-[15px] text-grey-300">
          {switchOn ? "Enabled" : "Disabled"}
        </span>
        <Switch checked={false} disabled />
      </Row>
      <Row label="Checkbox">
        <div class="flex items-center gap-2">
          <Checkbox id="c1" bind:checked />
          <Label for="c1">Certified for release</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="c2" indeterminate />
          <Label for="c2">Partially selected</Label>
        </div>
        <div class="flex items-center gap-2">
          <Checkbox id="c3" disabled />
          <Label for="c3">Disabled</Label>
        </div>
      </Row>
      <Row label="Radio">
        <RadioGroup bind:value={radio} class="flex gap-6">
          <div class="flex items-center gap-2">
            <RadioGroupItem value="studio" id="r1" />
            <Label for="r1">Engine Studio</Label>
          </div>
          <div class="flex items-center gap-2">
            <RadioGroupItem value="integration" id="r2" />
            <Label for="r2">Engine Integration</Label>
          </div>
        </RadioGroup>
      </Row>
      <Row label="Progress">
        <div class="w-[320px]"><Progress value={64} /></div>
        <span class="font-mono text-[13px] text-grey-400">64%</span>
      </Row>
    </Section>

    <Section
      eyebrow="Component 06"
      title="Card."
      note="Off-black panel, 1.5px rule, 18px radius, with an inner panel at 10px holding artwork. Hover lifts the rule. Not a shadow, not a transform."
    >
      <div class="grid gap-6 md:grid-cols-3">
        {#each ["Turbine", "Manifold", "Keycap"] as name (name)}
          <Card>
            <CardHeader>
              <CardTitle>{name}.</CardTitle>
              <CardDescription>
                Monochrome machined objects. Never people, never warm tones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                class="flex h-40 items-center justify-center rounded-card-inner bg-black"
              >
                <span class="font-mono text-[11px] tracking-[0.08em] text-grey-500 uppercase">
                  Inner panel · 10px
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Badge variant="secondary">Engine Studio</Badge>
            </CardFooter>
          </Card>
        {/each}
      </div>
    </Section>

    <Section
      eyebrow="Component 07"
      title="Tabs."
      note="Two flavours. Pill is the default. Underline is the section-level treatment: a hairline rule with a 2px magenta marker under the active tab. No pill-background tabs at section level."
    >
      <Tabs value="math">
        <TabsList>
          <TabsTrigger value="math">Math</TabsTrigger>
          <TabsTrigger value="bets">Bets</TabsTrigger>
          <TabsTrigger value="issues">Issues</TabsTrigger>
        </TabsList>
        <TabsContent value="math" class="pt-4 text-[15px] text-grey-300">
          Pill tabs, for switching a panel's contents.
        </TabsContent>
        <TabsContent value="bets" class="pt-4 text-[15px] text-grey-300">
          Bets.
        </TabsContent>
        <TabsContent value="issues" class="pt-4 text-[15px] text-grey-300">
          Issues.
        </TabsContent>
      </Tabs>

      <Tabs value="overview">
        <TabsList variant="underline">
          <TabsTrigger variant="underline" value="overview">Overview</TabsTrigger>
          <TabsTrigger variant="underline" value="catalogue">Catalogue</TabsTrigger>
          <TabsTrigger variant="underline" value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" class="pt-4 text-[15px] text-grey-300">
          Underline tabs, for navigating a page's sections.
        </TabsContent>
        <TabsContent value="catalogue" class="pt-4 text-[15px] text-grey-300">
          Catalogue.
        </TabsContent>
        <TabsContent value="settings" class="pt-4 text-[15px] text-grey-300">
          Settings.
        </TabsContent>
      </Tabs>
    </Section>

    <Section
      eyebrow="Component 08"
      title="Overlays."
      note="Dialog scrim is rgba(10,10,10,.72) with an 18px blur. This and the sticky header are the only sanctioned uses of blur. Panels enter over 220ms and exit over 140ms."
    >
      <Row label="Dialog, Popover, Tooltip">
        <Dialog bind:open={dialogOpen}>
          <DialogTrigger>
            {#snippet child({ props })}
              <Button {...props}>Open Dialog</Button>
            {/snippet}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Publish to Production.</DialogTitle>
              <DialogDescription>
                The build is promoted to every operator on the revenue share.
                This cannot be undone from here.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="ghost" onclick={() => (dialogOpen = false)}>
                Cancel
              </Button>
              <Button onclick={() => (dialogOpen = false)}>Publish</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Popover>
          <PopoverTrigger>
            {#snippet child({ props })}
              <Button variant="outline" {...props}>Open Popover</Button>
            {/snippet}
          </PopoverTrigger>
          <PopoverContent class="w-80">
            <p class="text-[15px] leading-[1.45]">
              Popovers sit on the raised surface at 10px radius, with the panel
              shadow reserved for product chrome.
            </p>
          </PopoverContent>
        </Popover>

        <Tooltip>
          <TooltipTrigger>
            {#snippet child({ props })}
              <Button variant="ghost" {...props}>Hover For Tooltip</Button>
            {/snippet}
          </TooltipTrigger>
          <TooltipContent>Appears after 300ms, fades in 140ms.</TooltipContent>
        </Tooltip>
      </Row>

      <Row label="Responsive dialog">
        <ResponsiveDialog bind:open={adaptiveOpen}>
          <ResponsiveDialogTrigger>
            {#snippet child({ props })}
              <Button {...props}>Adjust Limits</Button>
            {/snippet}
          </ResponsiveDialogTrigger>
          <ResponsiveDialogContent>
            <ResponsiveDialogHeader>
              <ResponsiveDialogTitle>Adjust Limits.</ResponsiveDialogTitle>
              <ResponsiveDialogDescription>
                Narrow the window past 768px and open it again. The same markup
                arrives as a bottom sheet, and the footer stacks.
              </ResponsiveDialogDescription>
            </ResponsiveDialogHeader>
            <div class="flex flex-col gap-2">
              <Label for="stake-cap">Stake cap</Label>
              <Input id="stake-cap" value="250.00" />
            </div>
            <ResponsiveDialogFooter>
              <Button variant="ghost" onclick={() => (adaptiveOpen = false)}>
                Cancel
              </Button>
              <Button onclick={() => (adaptiveOpen = false)}>Save</Button>
            </ResponsiveDialogFooter>
          </ResponsiveDialogContent>
        </ResponsiveDialog>

        <ResponsiveDialog mode="sheet" bind:open={sheetOpen}>
          <ResponsiveDialogTrigger>
            {#snippet child({ props })}
              <Button variant="outline" {...props}>Sheet, Pinned</Button>
            {/snippet}
          </ResponsiveDialogTrigger>
          <ResponsiveDialogContent>
            <ResponsiveDialogHeader>
              <ResponsiveDialogTitle>Sheet, Pinned.</ResponsiveDialogTitle>
              <ResponsiveDialogDescription>
                The mobile surface held open on a desktop viewport. Drag the
                handle down to dismiss it.
              </ResponsiveDialogDescription>
            </ResponsiveDialogHeader>
            <ResponsiveDialogFooter>
              <Button variant="ghost" onclick={() => (sheetOpen = false)}>
                Cancel
              </Button>
              <Button onclick={() => (sheetOpen = false)}>Confirm</Button>
            </ResponsiveDialogFooter>
          </ResponsiveDialogContent>
        </ResponsiveDialog>

        <ResponsiveDialog desktop="popover" bind:open={popoutOpen}>
          <ResponsiveDialogTrigger>
            {#snippet child({ props })}
              <Button variant="ghost" {...props}>Popover, Then Sheet</Button>
            {/snippet}
          </ResponsiveDialogTrigger>
          <ResponsiveDialogContent align="start">
            <ResponsiveDialogHeader>
              <ResponsiveDialogTitle>Sort By.</ResponsiveDialogTitle>
            </ResponsiveDialogHeader>
            <RadioGroup bind:value={radio}>
              <div class="flex items-center gap-2">
                <RadioGroupItem value="studio" id="sort-studio" />
                <Label for="sort-studio">Studio</Label>
              </div>
              <div class="flex items-center gap-2">
                <RadioGroupItem value="release" id="sort-release" />
                <Label for="sort-release">Release date</Label>
              </div>
            </RadioGroup>
          </ResponsiveDialogContent>
        </ResponsiveDialog>
      </Row>
    </Section>

    <Section
      eyebrow="Component 09"
      title="Table."
      note="Ruled, not tiled. No frame, no fills, no gaps. The surface behind shows through, and a hairline under each row does all the structural work. Headings are Bold 13px in Pure White, Title Case, separated from the body by a rule one step stronger than the dividers."
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Game</TableHead>
            <TableHead>Studio</TableHead>
            <TableHead>RTP</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {#each [["Turbine Rush", "Northwind", "96.42%", "Live", false], ["Manifold", "Grayscale", "95.18%", "Draft", true], ["Keycap Klondike", "Northwind", "96.01%", "Live", false], ["Pipework", "Grayscale", "94.87%", "Draft", false]] as row (row[0])}
            <TableRow data-state={row[4] ? "selected" : undefined}>
              <TableCell class="font-semibold">{row[0]}</TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell class="font-mono">{row[2]}</TableCell>
              <TableCell>
                {#if row[3] === "Live"}
                  <Badge variant="success">live</Badge>
                {:else}
                  <Badge variant="secondary">draft</Badge>
                {/if}
              </TableCell>
            </TableRow>
          {/each}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>4 games</TableCell>
            <TableCell>2 studios</TableCell>
            <TableCell class="font-mono">95.87%</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        Hover a row for the 6% white wash. The second row is
        <span class="font-mono text-[13px]">data-state="selected"</span>, which
        takes the magenta tint. Never a coloured border or an edge accent, both
        of which the brand rules out. Because the cells carry no fill there are
        no fill collisions. A Badge, a Separator or an unchecked Switch reads
        correctly in any column, which the gapped-tile treatment could not
        promise.
      </p>
    </Section>

    <Section
      eyebrow="Component 10"
      title="Skeleton and Separator."
      note="Loading states stay on the grey ramp. A divider is a 1px hairline, never a coloured rule."
    >
      <div class="flex max-w-[520px] flex-col gap-3">
        <Skeleton class="h-8 w-2/3" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-4/5" />
      </div>
      <Separator />
      <p class="text-[15px] text-grey-300">Below the rule.</p>
    </Section>

    <Section
      eyebrow="Reference 01"
      title="Do not."
      note="The prohibitions, in one list, so nothing has to be inferred from the absence of an example. Four of them are grep checks in CI, so the build fails on them rather than a reviewer having to catch them."
    >
      <div class="grid w-full gap-x-12 md:grid-cols-2">
        {#each prohibitions as pr (pr.rule)}
          <div class="flex items-start justify-between gap-4 border-b border-grey-800 py-4">
            <p class="text-[15px] leading-[1.45]">{pr.rule}</p>
            {#if pr.ci}
              <Badge variant="outline" class="shrink-0">ci</Badge>
            {/if}
          </div>
        {/each}
      </div>
      <p class="max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        When something is not covered here, choose the option that is quieter
        and more mechanical. That resolves most of what this list does not.
      </p>
    </Section>

    <footer class="border-t border-grey-700 pt-14 pb-8">
      <p class="font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase">
        Engine Design System
      </p>
      <p class="mt-3 max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        Built from the Engine brand guidelines and the written design system
        specification, which remain the source of truth. Where this package and
        those documents disagree, the documents win and this package is wrong.
      </p>
    </footer>
  </div>
</TooltipProvider>

<style>
  /* A reveal is a short upward move with a fade. 8px, never more. Written as
     a keyframe and not a transition so it replays from the top each time Run
     is pressed and settles visible, which a two-state toggle cannot do. */
  @keyframes reveal {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  .reveal {
    animation: reveal 640ms var(--ease-brand-out);
  }
</style>
