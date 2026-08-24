<script lang="ts" module>
  import { type VariantProps, tv } from "tailwind-variants"

  // Tag is the system's other chip, and the distinction from Badge is shape,
  // not size: a Badge is a solid pill that states status ("Live", "Partner"),
  // a Tag is a 6px-radius outline chip that labels a category ("Slots",
  // "Live Casino"). Never use a Tag for status or a Badge for a category.
  export const tagVariants = tv({
    base: [
      "inline-flex items-center rounded-tag border-[1.5px] px-2 py-0.5",
      "text-[13px] font-semibold whitespace-nowrap",
      "transition-colors duration-140 ease-brand",
    ],
    variants: {
      variant: {
        default: "border-grey-600 text-grey-200 hover:border-grey-500",
        brand: "border-primary text-primary",
        // Category tag for Engine Integration. Outline only — a solid
        // sub-brand fill is a Badge, and a surface takes at most one accent.
        // The `originals` and `sportsbook` variants that shipped upstream are
        // gone: their ramps are retired and have no owner.
        partner: "border-partner-yellow text-partner-yellow",
        solid: "border-transparent bg-grey-700 text-foreground",
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
