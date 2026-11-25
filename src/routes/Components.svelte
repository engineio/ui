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
</script>

<Section
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
  <p class="max-w-[920px] text-body text-foreground">
    There is no solid variant. An opaque fill can only be right on one
    surface, and these chips have to read on the page, on a card and in a
    table cell. The status variants are functional, not categorical. Reach
    for <span class="font-mono text-body">success</span> when something
    has succeeded, never because green suited the row. The brand chip's ink
    is <span class="font-mono text-body">primary-300</span> and not pure
    magenta, because magenta on its own tint is 4.37:1 and the brand forbids
    magenta text below 15px bold.
  </p>
</Section>

<Section
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
  <p class="max-w-[920px] text-body text-foreground">
    The bar is <span class="font-mono text-body">aria-hidden</span>, so
    the title has to carry the message with the colour ignored entirely.
    "Upload failed." beats "Error." The neutral variant takes a grey bar
    instead of none, so a mixed stack keeps its left edge. Pass
    <span class="font-mono text-body">onDismiss</span> to get the close
    control, and omit it for a static alert.
  </p>
</Section>

<Section
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
  title="Controls."
  note="Checkbox at 18px with a 6px radius, radio as an 18px circle, switch as a 44 × 24 track. Magenta fill when on, knob travels in 140ms."
>
  <Row label="Switch">
    <Switch bind:checked={switchOn} />
    <span class="text-body text-grey-300">
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
    <span class="font-mono text-body text-grey-400">64%</span>
  </Row>
</Section>

<Section
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
            class="flex h-40 items-center justify-center rounded-card-inner bg-background"
          >
            <span class="text-body text-grey-400">
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
  title="Tabs."
  note="Two flavours. Pill is the default. Underline is the section-level treatment: a hairline rule with a 2px magenta marker under the active tab. No pill-background tabs at section level."
>
  <Tabs value="math">
    <TabsList>
      <TabsTrigger value="math">Math</TabsTrigger>
      <TabsTrigger value="bets">Bets</TabsTrigger>
      <TabsTrigger value="issues">Issues</TabsTrigger>
    </TabsList>
    <TabsContent value="math" class="pt-4 text-body text-grey-300">
      Pill tabs, for switching a panel's contents.
    </TabsContent>
    <TabsContent value="bets" class="pt-4 text-body text-grey-300">
      Bets.
    </TabsContent>
    <TabsContent value="issues" class="pt-4 text-body text-grey-300">
      Issues.
    </TabsContent>
  </Tabs>

  <Tabs value="overview">
    <TabsList variant="underline">
      <TabsTrigger variant="underline" value="overview">Overview</TabsTrigger>
      <TabsTrigger variant="underline" value="catalogue">Catalogue</TabsTrigger>
      <TabsTrigger variant="underline" value="settings">Settings</TabsTrigger>
    </TabsList>
    <TabsContent value="overview" class="pt-4 text-body text-grey-300">
      Underline tabs, for navigating a page's sections.
    </TabsContent>
    <TabsContent value="catalogue" class="pt-4 text-body text-grey-300">
      Catalogue.
    </TabsContent>
    <TabsContent value="settings" class="pt-4 text-body text-grey-300">
      Settings.
    </TabsContent>
  </Tabs>
</Section>

<Section
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
        <p class="text-body">
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
  title="Table."
  note="Ruled, not tiled. No frame, no fills, no gaps. The surface behind shows through, and a hairline under each row does all the structural work. Headings are Bold 16px in Pure White, Title Case, separated from the body by a rule one step stronger than the dividers."
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
  <p class="max-w-[920px] text-body text-foreground">
    Hover a row for the 6% white wash. The second row is
    <span class="font-mono text-body">data-state="selected"</span>, which
    takes the magenta tint. Never a coloured border or an edge accent, both
    of which the brand rules out. Because the cells carry no fill there are
    no fill collisions. A Badge, a Separator or an unchecked Switch reads
    correctly in any column, which the gapped-tile treatment could not
    promise.
  </p>
</Section>

<Section
  title="Skeleton and Separator."
  note="Loading states stay on the grey ramp. A divider is a 1px hairline, never a coloured rule."
>
  <div class="flex max-w-[520px] flex-col gap-3">
    <Skeleton class="h-8 w-2/3" />
    <Skeleton class="h-4 w-full" />
    <Skeleton class="h-4 w-4/5" />
  </div>
  <Separator />
  <p class="text-body text-grey-300">Below the rule.</p>
</Section>
