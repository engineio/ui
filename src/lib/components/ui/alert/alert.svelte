<script lang="ts" module>
  import { type VariantProps, tv } from "tailwind-variants"

  // The panel is always neutral. A 3px bar down the left edge is the ONLY
  // thing that says whether this is good, bad or a warning — the fill, the
  // rule and the type never change, so a wall of alerts reads as one surface
  // with a column of state down the side rather than as four different
  // components.
  //
  // ON THE BRAND RULE. The brand prohibits "a coloured left-edge accent",
  // twice, and it is worth being precise about what it prohibits: both
  // wordings scope it to signalling identity — "to signal which sub-brand a
  // card belongs to", "to indicate category or ownership" — with the reason
  // given that the lockup does that job. This bar signals STATE, which no
  // lockup can do and which nothing else in the system claims. That is the
  // reading this component is built on. It is a reading, though, not an
  // exemption, so it is raised in the README with the other deviations.
  //
  // `alertVariants` is the extension seam — see button.svelte for the
  // `tv({ extend: … })` recipe.
  export const alertVariants = tv({
    base: [
      "relative w-full overflow-hidden rounded-media",
      "border border-grey-700 bg-card",
      "py-3.5 pr-4 pl-5",
    ],
    variants: {
      // Applied to the bar, not the panel.
      variant: {
        default: "[--alert-bar:var(--color-grey-500)]",
        success: "[--alert-bar:var(--color-success)]",
        warning: "[--alert-bar:var(--color-warning)]",
        danger: "[--alert-bar:var(--color-danger)]",
        // shadcn's name for danger, kept so existing call sites resolve.
        destructive: "[--alert-bar:var(--color-danger)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  })

  export type AlertVariant = VariantProps<typeof alertVariants>["variant"]
</script>

<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import X from "@lucide/svelte/icons/x"
  import type { HTMLAttributes } from "svelte/elements"

  let {
    ref = $bindable(null),
    class: className,
    variant = "default",
    onDismiss = undefined,
    dismissLabel = "Dismiss",
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    variant?: AlertVariant
    /** Supply a handler to render the close control. Omit for a static alert. */
    onDismiss?: (() => void) | undefined
    dismissLabel?: string
  } = $props()
</script>

<div
  bind:this={ref}
  class={cn(alertVariants({ variant }), onDismiss && "pr-11", className)}
  {...restProps}
  role="alert"
>
  <!--
    A real element rather than a `before:` pseudo — the panel's `overflow-hidden`
    clips it to the corner radius either way, but a real element cannot be
    knocked out by a consumer passing their own `before:` utility, and it needs
    no `content-['']`. `aria-hidden` because the colour is decoration: the text
    has to say what happened on its own.
  -->
  <span
    aria-hidden="true"
    class="absolute inset-y-0 left-0 w-[3px]"
    style="background-color: var(--alert-bar)"
  ></span>

  {@render children?.()}

  {#if onDismiss}
    <button
      type="button"
      onclick={onDismiss}
      aria-label={dismissLabel}
      class={cn(
        "absolute top-3 right-3 grid size-6 place-items-center rounded-control",
        "text-grey-400 transition-colors duration-140 ease-brand",
        "hover:bg-white/6 hover:text-foreground",
        "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
      )}
    >
      <X class="size-4" />
    </button>
  {/if}
</div>
