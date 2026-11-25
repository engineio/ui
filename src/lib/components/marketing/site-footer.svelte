<script lang="ts" module>
  export type FooterColumn = { heading: string; links: { name: string; href: string }[] }
</script>

<script lang="ts">
  import { cn } from "../../utils.js"
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right"
  import type { Snippet } from "svelte"

  // The landing page footer: one rule, the brand and a tagline, link columns,
  // then a copyright line with the legal links on the right.
  //
  // ONE rule on the whole page — this one, `grey-700`, above the footer. The
  // columns have no rules between them and the bottom bar has none above it.
  //
  // Links are `grey-300` lifting to white. This is one of the places grey is
  // right: the column headings are white and the links sit under them, so
  // the grey is hierarchy, not a default. Anything pointing off-site opens in
  // a new tab with an arrow and a screen-reader note; the test is simply
  // whether the href starts with `http`.
  //
  // Sentence case throughout, no uppercase, no mono.

  let {
    brand,
    tagline,
    columns,
    legal = [],
    name = "Engine",
    class: className,
  }: {
    /** The lockup or wordmark, already wrapped in its home link. */
    brand: Snippet
    /** One line under the brand, e.g. the page's own h1. */
    tagline?: string
    columns: FooterColumn[]
    /** Terms, Privacy — the right-hand side of the bottom bar. */
    legal?: { name: string; href: string }[]
    /** The copyright holder. */
    name?: string
    class?: string
  } = $props()

  const external = (href: string) => href.startsWith("http")
  const link =
    "inline-flex items-center gap-1 text-nav text-grey-300 transition-colors duration-140 ease-brand hover:text-foreground"
</script>

<footer class={cn("mx-auto max-w-marketing px-gutter pb-10", className)}>
  <div
    class="grid gap-10 border-t border-grey-700 pt-12 md:grid-cols-[1.5fr_repeat(var(--cols),1fr)] md:gap-8"
    style="--cols: {columns.length}"
  >
    <div class="flex flex-col gap-4">
      {@render brand()}
      {#if tagline}
        <p class="max-w-[30ch] text-body text-foreground">{tagline}</p>
      {/if}
    </div>
    {#each columns as column (column.heading)}
      <nav aria-label={column.heading} class="flex flex-col gap-3">
        <span class="text-nav font-semibold text-foreground">{column.heading}</span>
        <ul class="flex flex-col gap-2">
          {#each column.links as entry (entry.name)}
            <li>
              <a
                href={entry.href}
                target={external(entry.href) ? "_blank" : undefined}
                rel={external(entry.href) ? "noopener" : undefined}
                class={link}
              >
                {entry.name}
                {#if external(entry.href)}
                  <ArrowUpRight class="size-3" aria-hidden="true" /><span class="sr-only">Opens in a new tab.</span>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      </nav>
    {/each}
  </div>
  <div class="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-body text-grey-300">
    <span>© {new Date().getFullYear()} {name}.</span>
    {#if legal.length > 0}
      <span class="flex flex-wrap gap-x-5 gap-y-2">
        {#each legal as entry (entry.name)}
          <a href={entry.href} class="transition-colors duration-140 ease-brand hover:text-foreground">{entry.name}</a>
        {/each}
      </span>
    {/if}
  </div>
</footer>
