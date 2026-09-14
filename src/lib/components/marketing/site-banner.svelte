<script lang="ts">
  import { cn } from "$lib/utils.js"
  import ArrowUpRight from "@lucide/svelte/icons/arrow-up-right"
  import type { Snippet } from "svelte"

  // The strip above the header that sends the wrong audience to the right
  // product: "Are you a creator? Games are built and published on Engine
  // Studio. Go to Engine Studio."
  //
  // It is the press shade of magenta with WHITE 13px text, and that is a
  // measured exception to the system's "ink on an accent fill is Off Black"
  // rule: white on `primary-press` is 5.25:1, Off Black on it 3.67:1, so
  // here white is the legal ink and Off Black is not. On `primary` itself
  // white would be 3.9:1 — which is why the banner is the press shade and
  // not the primary.
  //
  // It scrolls away; the header below it is what sticks.
  //
  // The creators landing paints this yellow (`class="bg-partner-yellow
  // text-background"`) because it points at Integration, whose reserved
  // accent that is. That is an open brand decision being expressed, not a
  // second variant of this component — pass the classes if you need it.

  let {
    href,
    cta,
    external = true,
    class: className,
    children,
  }: {
    href?: string
    /** The link text after the message. */
    cta?: string
    external?: boolean
    class?: string
    children: Snippet
  } = $props()
</script>

<div class={cn("bg-primary-press px-gutter py-2.5 text-center text-small font-medium text-white", className)}>
  {@render children()}
  {#if href && cta}
    <a
      {href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      class="ml-1 inline-flex items-center gap-1 font-semibold whitespace-nowrap underline decoration-[color-mix(in_oklab,currentColor_50%,transparent)] underline-offset-[3px] transition-colors duration-140 ease-brand hover:decoration-current"
    >
      {cta}
      {#if external}
        <ArrowUpRight class="size-3.5" aria-hidden="true" /><span class="sr-only">Opens in a new tab.</span>
      {/if}
    </a>
  {/if}
</div>
