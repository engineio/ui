<script lang="ts" module>
  export type NavLink = { name: string; href: string; external?: boolean }
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js"
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right"
  import Menu from "@lucide/svelte/icons/menu"
  import X from "@lucide/svelte/icons/x"
  import type { Snippet } from "svelte"
  import { slide } from "svelte/transition"

  // The landing page header: a sticky glass bar, the brand on the left, a
  // strip of sentence-case links on the right, a burger below `md`.
  //
  // GLASS, ALWAYS. 65% page colour over 20px of blur, at the top of the page
  // as well as after scrolling. An earlier version was transparent at rest
  // and turned to glass on scroll; it looked like a bug whenever the hero art
  // ran up under it, and the always-on version is what the hero is composed
  // against — its art starts at the header's top edge so the top band of the
  // render shows through.
  //
  // NO BORDERS. No bottom rule, no cell dividers. The strip is bare text with
  // a `grey-850` hover fill for feedback. A 1px rule under a glass bar reads
  // as a hard line across whatever is passing beneath it.
  //
  // The row is `items-stretch` and each cell `h-full`, so a cell's hover fill
  // runs the full height of the bar. Cells with a fixed height inside a bar
  // with a bottom rule are how the rule ends up painted over — the bug this
  // layout exists to prevent, even now the rule is gone.
  //
  // The content row is the marketing column with a LEFT gutter only: the
  // brand lines up with the hero text, and the last cell's right edge ends at
  // the column edge, with the cell's own padding as the gutter.
  //
  // BELOW `md`: the strip hides, `action` becomes an outline pill left of the
  // burger, and the burger opens a solid panel under the bar with the links
  // stacked at 17px. The action is deliberately NOT repeated in the panel.

  let {
    home = "/",
    label,
    links = [],
    action,
    brand,
    class: className,
  }: {
    home?: string
    /** Accessible name for the brand link, e.g. "Engine Studio". */
    label: string
    links?: NavLink[]
    /** The last cell — usually Sign in. Shown as a pill on phones. */
    action?: NavLink
    /** The lockup or wordmark. Show the icon alone below `md` inside it if you want. */
    brand: Snippet
    class?: string
  } = $props()

  let open = $state(false)

  const cell =
    "relative flex h-full items-center justify-center gap-1.5 px-5 text-[15px] font-medium whitespace-nowrap text-white transition-colors duration-220 ease-brand hover:bg-grey-850 max-md:px-4"
</script>

<header class={cn("glass sticky top-0 z-20", className)}>
  <div class="mx-auto flex h-header-sm max-w-marketing items-stretch pl-gutter md:h-header">
    <a href={home} aria-label={label} class="flex shrink-0 items-center pr-6">
      {@render brand()}
    </a>

    <nav aria-label="Main" class="ml-auto flex min-w-0 items-stretch max-md:hidden">
      {#each links as link (link.href)}
        <a
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener" : undefined}
          class={cell}
        >
          {link.name}
          {#if link.external}
            <ArrowUpRight class="size-3.5" aria-hidden="true" /><span class="sr-only">Opens in a new tab.</span>
          {/if}
        </a>
      {/each}
      {#if action}
        <a
          href={action.href}
          target={action.external ? "_blank" : undefined}
          rel={action.external ? "noopener" : undefined}
          class={cell}
        >
          {action.name} <ArrowUpRight class="size-3.5" aria-hidden="true" />
        </a>
      {/if}
    </nav>

    {#if action}
      <a
        href={action.href}
        target={action.external ? "_blank" : undefined}
        rel={action.external ? "noopener" : undefined}
        class="ml-auto flex items-center gap-1 self-center rounded-control border border-grey-500 px-3.5 py-1.5 text-small font-semibold whitespace-nowrap text-white md:hidden"
      >
        {action.name} <ArrowUpRight class="size-3.5" aria-hidden="true" />
      </a>
    {/if}
    <button
      type="button"
      class={cn("flex h-full w-14 items-center justify-center text-white md:hidden", !action && "ml-auto")}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="site-menu"
      onclick={() => (open = !open)}
    >
      {#if open}
        <X class="size-6" aria-hidden="true" />
      {:else}
        <Menu class="size-6" aria-hidden="true" />
      {/if}
    </button>
  </div>

  {#if open}
    <nav
      id="site-menu"
      aria-label="Menu"
      class="absolute inset-x-0 top-full flex flex-col bg-background px-gutter pb-3 md:hidden"
      transition:slide={{ duration: 320 }}
    >
      {#each links as link (link.href)}
        <a
          href={link.href}
          target={link.external ? "_blank" : undefined}
          rel={link.external ? "noopener" : undefined}
          class="flex items-center justify-between py-3.5 text-[17px] font-semibold text-white"
          onclick={() => (open = false)}
        >
          {link.name}
          {#if link.external}
            <ArrowUpRight class="size-4" aria-hidden="true" />
          {/if}
        </a>
      {/each}
    </nav>
  {/if}
</header>
