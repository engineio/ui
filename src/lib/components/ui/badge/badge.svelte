<script lang="ts" module>
  import { type VariantProps, tv } from "tailwind-variants"

  // The system's one chip. Badge and Tag used to be separate components with
  // a rule about which was which — solid pill for status, soft chip for
  // category — and in practice that rule only ever generated arguments. This
  // is the merged component: ONE chip, in the soft repository-label treatment
  // (tinted fill, matching ink, 6px radius) for every job.
  //
  // It kept the name `Badge` because that is the name in use: 35 call sites in
  // the engine repo say `<Badge>`, and none say `<Tag>`. Every variant those
  // call sites reference — default, secondary, outline, success, destructive —
  // survives below, so adopting this is a restyle rather than a migration.
  //
  // `badgeVariants` is the extension seam — see button.svelte for the
  // `tv({ extend: … })` recipe.
  //
  // FILLS ARE TRANSLUCENT, AND THAT IS THE POINT. A chip has to read on the
  // page (#0E0E0E), on a card (#161616) and on a table tile (#242424). An
  // opaque grey fill can only be correct on one of them — the old `secondary`
  // was grey-700, which vanished on a table tile, and a grey-800 fill would
  // vanish on a card. A wash composites against whatever is behind it and
  // stays roughly one step lighter everywhere. This is why there is no
  // `solid` variant: an opaque chip is a surface-specific chip.
  //
  // ON THE BRAND INK. `default` sets its ink to `primary-300` #FF5C9B, not
  // pure magenta: #FF006A on its own 12% tint measures 4.37:1, under AA, and
  // the brand forbids magenta text below 15px bold. The lighter step gets
  // 5.81:1 and ships today as `--brand-300` in integration.css. As a
  // side-effect this fixes the contrast contradiction the old solid badge
  // carried — white on magenta at 11px was 3.9:1, a known AA failure.
  //
  // ON THE HUES. The status variants are FUNCTIONAL — success, warning and
  // danger report state. Do not use them as a categorical palette; `success`
  // meaning "slots" because green looked right spends the only signal they
  // carry. A real categorical palette is still a brand-team decision.
  export const badgeVariants = tv({
    base: [
      "inline-flex items-center rounded-tag px-2 py-0.5",
      "text-[13px] font-semibold whitespace-nowrap",
      "transition-colors duration-140 ease-brand",
    ],
    variants: {
      variant: {
        // Brand. The default, because an unqualified chip is an Engine chip.
        default: "bg-primary-tint-12 text-primary-300 hover:bg-primary-tint-24",
        // Neutral. The workhorse — a label with no state attached.
        secondary: "bg-white/8 text-grey-200 hover:bg-white/12",
        // No fill at all, for a chip on an already-busy surface.
        outline:
          "border-[1.5px] border-grey-600 text-foreground hover:border-grey-500",
        // Engine Integration's reserved accent. Not in use — see tokens.css.
        partner: "bg-partner-yellow-tint-12 text-partner-yellow",

        // Status. Functional colour only.
        success: "bg-success-tint-12 text-success",
        warning: "bg-warning-tint-12 text-warning",
        danger: "bg-danger-tint-12 text-danger",
        // shadcn's name for danger, kept so existing call sites resolve.
        destructive: "bg-danger-tint-12 text-danger",
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
