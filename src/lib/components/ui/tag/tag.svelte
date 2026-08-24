<script lang="ts" module>
  import { type VariantProps, tv } from "tailwind-variants"

  // Tag is the system's label chip, and the distinction from Badge is
  // treatment, not size: a Badge is a SOLID pill that states status ("Live",
  // "Draft"), a Tag is a SOFT chip that labels a category ("Slots", "Live
  // Casino") — a tinted fill with matching ink, in the manner of a repository
  // label. Never use a Tag for status or a Badge for a category.
  //
  // `tagVariants` is the extension seam — see button.svelte for the
  // `tv({ extend: … })` recipe.
  //
  // ON THE INK. The brand variant sets its ink to `primary-300` #FF5C9B, not
  // pure magenta. Two reasons, both hard: pure #FF006A on its own 12% tint
  // measures 4.37:1, under the 4.5:1 AA threshold; and the brand forbids
  // magenta text below 15px bold, which a 13px chip cannot satisfy. The
  // lighter step gets 5.81:1 and ships today as `--brand-300` in
  // integration.css. If the brand team would rather hold the line literally,
  // the alternative is white ink on a 24% tint (14.6:1) — one word, at the
  // cost of the soft style's whole character.
  //
  // ON THE HUES. A repository-label system usually comes with a wide
  // categorical palette — red, orange, amber, lime, teal, indigo, and so on.
  // This package ships THREE tags because the brand ships three colours, and
  // a categorical palette is the same unmade decision as the status palette
  // (§12). Do not add hues here to make a label set; that call belongs to the
  // brand team, and 18 accents on one surface is the opposite of "one accent
  // per surface, never two".
  export const tagVariants = tv({
    base: [
      "inline-flex items-center rounded-tag px-2 py-0.5",
      "text-[13px] font-semibold whitespace-nowrap",
      "transition-colors duration-140 ease-brand",
    ],
    variants: {
      variant: {
        // Soft: tinted fill, matching ink, no border.
        default: "bg-grey-800 text-grey-200 hover:bg-grey-700",
        brand: "bg-primary-tint-12 text-primary-300 hover:bg-primary-tint-24",
        // Engine Integration's reserved accent. Not in use — see tokens.css.
        partner: "bg-partner-yellow-tint-12 text-partner-yellow",
        // The filled counterpart, for a chip that has to hold its own against
        // a busy surface. White ink, so it takes the neutral fill.
        solid: "bg-grey-700 text-foreground hover:bg-grey-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  })

  export type TagVariant = VariantProps<typeof tagVariants>["variant"]
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
    variant?: TagVariant
  } = $props()
</script>

<svelte:element
  this={href ? "a" : "span"}
  bind:this={ref}
  {href}
  class={cn(tagVariants({ variant }), className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
