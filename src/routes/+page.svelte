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
    Input,
    Label,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Progress,
    RadioGroup,
    RadioGroupItem,
    Separator,
    Skeleton,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Tag,
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

  const swatches = [
    { name: "Off Black", hex: "#0E0E0E", token: "background" },
    { name: "Pure White", hex: "#FFFFFF", token: "foreground" },
    { name: "Magenta", hex: "#FF006A", token: "primary" },
    { name: "Magenta Press", hex: "#D60059", token: "primary-press" },
    { name: "Partner Yellow", hex: "#FFDD00", token: "partner-yellow" },
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
</script>

<TooltipProvider>
  <div class="mx-auto max-w-[1480px] px-10 py-16">
    <header class="pb-14">
      <p
        class="mb-4 font-mono text-[11px] font-semibold tracking-[0.08em] text-grey-400 uppercase"
      >
        Engine · Design System · v0.1.0
      </p>
      <h1 class="max-w-[920px] text-[72px] leading-[0.94] font-bold tracking-[-0.02em]">
        One system. Every surface.
      </h1>
      <p class="mt-6 max-w-[920px] text-[18px] leading-[1.45] text-grey-300">
        Tokens, the brand face and twenty primitives, published as
        <span class="font-mono text-[16px] text-foreground">@engineio/ui</span>.
        Every component below is the shipped component — this page imports the
        package, so what renders here is what a product gets.
      </p>
    </header>

    <Section
      eyebrow="Section 01"
      title="Colour."
      note="The brand is three colours. Everything else is a neutral step between the outer two. One accent per surface, never two — and no gradients, no coloured borders, no light theme."
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

      <Alert>
        <AlertTitle>No status palette exists.</AlertTitle>
        <AlertDescription>
          The brand defines no success, warning or error colours, so
          <span class="font-mono">--color-destructive</span> resolves to magenta
          and a destructive control cannot be told apart from a primary one by
          colour alone. This is the system's most consequential open gap. It
          needs a brand-team decision, not a local workaround.
        </AlertDescription>
      </Alert>
    </Section>

    <Section
      eyebrow="Section 02"
      title="Typography."
      note="Proxima Nova only — Bold for display, Semibold for UI labels, Regular for body. Title Case for headlines, UPPERCASE only for small structural labels. No all-caps headlines, no italics, no other typefaces."
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
        <div class="flex items-baseline gap-8">
          <p
            class="w-[120px] shrink-0 font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase"
          >
            Mono
          </p>
          <p class="font-mono text-[15px]">
            GAME_ID 7f3a91c2 · RTP 96.42% · 2300 live games
          </p>
        </div>
      </div>
    </Section>

    <Section
      eyebrow="Section 03"
      title="Shape."
      note="Radii by role, never mixed arbitrarily on one surface — the outer frame is always larger than the inner panel. Two border weights only: 1px hairline for structure, 1.5px for container rules."
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
    </Section>

    <Section
      eyebrow="Section 04"
      title="Button."
      note="Pill controls at 32 / 40 / 48px, Bold 15px labels, 140ms mechanical transitions, a 0.98 press and a 2px magenta focus ring. Tab through them — the ring is never removed."
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
      eyebrow="Section 05"
      title="Badge and Tag."
      note="A Badge is a solid pill that states status. A Tag is a 6px outline chip that labels a category. Never swap them. The retired sub-brand variants — originals, sportsbook — are gone."
    >
      <Row label="Badge">
        <Badge>Live</Badge>
        <Badge variant="partner">Partner</Badge>
        <Badge variant="secondary">Draft</Badge>
        <Badge variant="outline">Archived</Badge>
      </Row>
      <Row label="Tag">
        <Tag>Slots</Tag>
        <Tag variant="brand">Featured</Tag>
        <Tag variant="partner">Integration</Tag>
        <Tag variant="solid">Live Casino</Tag>
      </Row>
    </Section>

    <Section
      eyebrow="Section 06"
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
      eyebrow="Section 07"
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
      eyebrow="Section 08"
      title="Card."
      note="Off-black panel, 1.5px rule, 18px radius, with an inner panel at 10px holding artwork. Hover lifts the rule — not a shadow, not a transform."
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
              <Badge variant="outline">Engine Studio</Badge>
            </CardFooter>
          </Card>
        {/each}
      </div>
    </Section>

    <Section
      eyebrow="Section 09"
      title="Tabs."
      note="Two flavours. Pill is the default; underline is the section-level treatment — a hairline rule with a 2px magenta marker under the active tab. No pill-background tabs at section level."
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
      eyebrow="Section 10"
      title="Overlays."
      note="Dialog scrim is rgba(10,10,10,.72) with an 18px blur — this and the sticky header are the only sanctioned uses of blur. Panels enter over 220ms and exit over 140ms."
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
    </Section>

    <Section
      eyebrow="Section 11"
      title="Table."
      note="Dense by default — this is a business tool. Numerics set in JetBrains Mono, which is specified by the brand and not yet loaded; see Known gaps in the README."
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
          {#each [["Turbine Rush", "Northwind", "96.42%", "Live"], ["Manifold", "Grayscale", "95.18%", "Draft"], ["Keycap Klondike", "Northwind", "96.01%", "Live"]] as row (row[0])}
            <TableRow>
              <TableCell class="font-semibold">{row[0]}</TableCell>
              <TableCell class="text-grey-300">{row[1]}</TableCell>
              <TableCell class="font-mono">{row[2]}</TableCell>
              <TableCell>
                {#if row[3] === "Live"}
                  <Badge>Live</Badge>
                {:else}
                  <Badge variant="secondary">Draft</Badge>
                {/if}
              </TableCell>
            </TableRow>
          {/each}
        </TableBody>
      </Table>
    </Section>

    <Section
      eyebrow="Section 12"
      title="Skeleton and Separator."
      note="Loading states stay on the grey ramp. A divider is a 1px hairline — never a coloured rule."
    >
      <div class="flex max-w-[520px] flex-col gap-3">
        <Skeleton class="h-8 w-2/3" />
        <Skeleton class="h-4 w-full" />
        <Skeleton class="h-4 w-4/5" />
      </div>
      <Separator />
      <p class="text-[15px] text-grey-300">Below the rule.</p>
    </Section>

    <footer class="border-t border-grey-700 pt-14 pb-8">
      <p class="font-mono text-[11px] tracking-[0.08em] text-grey-400 uppercase">
        Engine Design System
      </p>
      <p class="mt-3 max-w-[920px] text-[15px] leading-[1.45] text-grey-300">
        Built from
        <span class="font-mono text-[13px]">docs/brand/ENGINE-DESIGN-SYSTEM.md</span>
        in the engine repo, which remains the written source of truth. Where
        this package and that document disagree, the document wins and this
        package is wrong.
      </p>
    </footer>
  </div>
</TooltipProvider>
