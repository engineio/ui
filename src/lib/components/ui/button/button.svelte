<script lang="ts" module>
  import type { WithElementRef } from "bits-ui"
  import type {
    HTMLAnchorAttributes,
    HTMLButtonAttributes,
  } from "svelte/elements"
  import { type VariantProps, tv } from "tailwind-variants"

  // The system's button: pill controls, bold labels, 140ms mechanical
  // transitions, a 0.98 press and a magenta focus ring.
  //
  // THIS IS THE EXTENSION SEAM. `buttonVariants` is exported so a product can
  // add its own variants without forking the component or waiting on a
  // release here:
  //
  //     // $lib/components/ui/button-variants.ts
  //     import { buttonVariants } from "@engineio/ui/components/ui/button"
  //     import { tv } from "tailwind-variants"
  //
  //     export const appButtonVariants = tv({
  //       extend: buttonVariants,
  //       variants: {
  //         variant: {
  //           tab: "bg-transparent text-grey-300 hover:bg-white/6 hover:text-foreground",
  //           play: "bg-primary text-primary-foreground hover:bg-primary-press",
  //         },
  //       },
  //     })
  //
  // Brand rules (shape, weight, motion, focus) live here and are shared.
  // Product variants live in the product. The upstream engine button carried
  // `tab`, `tab-active`, `drawer`, `play`, `filled` and `success` in this
  // file; they are app concerns and have been left to the apps. `success` was
  // additionally off-palette (`bg-green-700`) — see the status-palette note
  // in styles/tokens.css.
  export const buttonVariants = tv({
    base: [
      "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap",
      "rounded-control text-[15px] font-bold tracking-[-0.01em]",
      "transition-[background-color,color,border-color,transform] duration-140 ease-brand",
      "active:scale-[0.98]",
      "focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
      "disabled:pointer-events-none disabled:opacity-38",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    ],
    variants: {
      variant: {
        // The system's four: primary, inverse, secondary, ghost.
        default: "bg-primary text-primary-foreground hover:bg-primary-press",
        inverse: "bg-white text-background hover:bg-grey-100",
        outline:
          "border-[1.5px] border-grey-500 bg-transparent text-foreground hover:bg-white/6",
        ghost: "bg-transparent text-foreground hover:bg-white/6",

        secondary: "bg-grey-800 text-foreground hover:bg-grey-700",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "bg-transparent text-foreground hover:bg-white/6",

        // Danger, per the system's Danger row: magenta as an OUTLINE with a
        // tint wash, never a magenta fill. A filled destructive button would
        // be pixel-identical to `default`, because there is no status palette
        // and `--color-destructive` therefore resolves to magenta. This shape
        // is the documented workaround for that gap, not a resolution of it.
        destructive:
          "border-[1.5px] border-grey-500 bg-transparent text-primary hover:bg-primary-tint-12",
      },
      size: {
        // 32 / 40 / 48px with the system's 12 / 18 / 24px padding.
        default: "h-10 px-4.5",
        sm: "h-8 px-3 text-[13px]",
        lg: "h-12 px-6 text-lg",
        icon: "size-10 rounded-full p-0",
        "icon-sm": "size-8 rounded-full p-0",
        "icon-lg": "size-12 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  })

  export type ButtonVariant = VariantProps<typeof buttonVariants>["variant"]
  export type ButtonSize = VariantProps<typeof buttonVariants>["size"]

  export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
    WithElementRef<HTMLAnchorAttributes> & {
      variant?: ButtonVariant
      size?: ButtonSize
      loading?: boolean
    }
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js"
  import LoaderCircle from "@lucide/svelte/icons/loader-circle"

  let {
    class: className,
    variant = "default",
    size = "default",
    ref = $bindable(null),
    href = undefined,
    type = "button",
    loading = false,
    disabled = false,
    children,
    ...restProps
  }: ButtonProps = $props()
</script>

{#if href}
  <a
    bind:this={ref}
    class={cn(buttonVariants({ variant, size }), className)}
    {href}
    {...restProps}
  >
    {#if loading}
      <LoaderCircle class="animate-spin" />
    {/if}
    {@render children?.()}
  </a>
{:else}
  <button
    bind:this={ref}
    class={cn(buttonVariants({ variant, size }), className)}
    {type}
    disabled={disabled || loading}
    {...restProps}
  >
    {#if loading}
      <LoaderCircle class="animate-spin" />
    {/if}
    {@render children?.()}
  </button>
{/if}
