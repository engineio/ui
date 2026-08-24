<script lang="ts" module>
  import { type VariantProps, tv } from "tailwind-variants"

  // A Badge is a solid pill that states status ("Live", "Partner"); a Tag is
  // an outline chip that labels a category. Never swap them.
  //
  // `badgeVariants` is the extension seam — see button.svelte for the
  // `tv({ extend: … })` recipe.
  //
  // The upstream engine badge also carried `originals` and `sportsbook`
  // variants built on the retired sub-brand ramps. Both are gone — those
  // ramps have no owner. Its `success` and `info` variants were a stock
  // Tailwind green and the retired sub-brand blue; `success` is back below on
  // the real status token, and `info` is not, because any blue would read as
  // Sportsbook Blue returning. See styles/tokens.css.
  //
  // CONTRAST WARNING — an unresolved contradiction in the spec, not a bug
  // here. §6 of the design system specifies Badge as "11px Semibold" with a
  // "--magenta bg, white text" fill. §3 says to keep magenta fills to
  // "labels at 15px bold or larger", because white-on-magenta is 3.9:1 and
  // needs the 3:1 large-text threshold to pass. An 11px badge cannot reach
  // that threshold, so the default variant below is a known AA failure.
  //
  // The spec's own escape hatch is "Off Black on magenta is always safe" —
  // i.e. swap `text-primary-foreground` for `text-background` on the default
  // variant. That is a one-word change, deliberately not made here: it alters
  // a brand-stated colour pairing, which is the brand team's call, not this
  // package's. Raised in the README under Known gaps.
  export const badgeVariants = tv({
    base: [
      "inline-flex items-center rounded-control border-transparent px-2.5 py-0.5",
      "text-[11px] font-bold tracking-[0.02em]",
      "transition-colors duration-140 ease-brand",
      "focus:ring-ring focus:ring-offset-background focus:ring-2 focus:ring-offset-2 focus:outline-none",
    ],
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-press",
        // Engine Integration's reserved accent, and light enough to take Off
        // Black ink — never white. Not in use yet; see styles/tokens.css.
        partner:
          "bg-partner-yellow text-background hover:bg-partner-yellow-press",
        secondary: "bg-grey-700 text-foreground hover:bg-grey-600",
        outline: "border-[1.5px] border-grey-600 bg-transparent text-foreground",

        // Status. Off Black ink on every status fill — white fails AA on all
        // three. A status badge reports state ("Live", "Failed", "Pending");
        // it is never emphasis, and never a second accent.
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        danger: "bg-danger text-danger-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  })

  export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"]
</script>

<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAnchorAttributes } from "svelte/elements"

  let {
    ref = $bindable(null),
    href,
    class: className,
    variant = "default",
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    variant?: BadgeVariant
  } = $props()
</script>

<svelte:element
  this={href ? "a" : "span"}
  bind:this={ref}
  {href}
  class={cn(badgeVariants({ variant }), className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
