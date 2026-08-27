<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Dialog as DialogPrimitive } from "bits-ui"
  import { getResponsiveDialogContext } from "./context.js"

  let {
    ref = $bindable(null),
    class: className,
    level = 2,
    children,
    ...restProps
  }: DialogPrimitive.TitleProps = $props()

  const context = getResponsiveDialogContext()
  const classes = $derived(
    cn("text-lg font-semibold leading-none tracking-tight", className),
  )
</script>

{#if context.primitive === "popover"}
  <!-- Popover has no Title primitive to label the surface with, because a
       popover is not a labelled region. The heading role is still worth
       having for anyone reading the page structure. -->
  <div
    bind:this={ref}
    role="heading"
    aria-level={level}
    class={classes}
    {...restProps}
  >
    {@render children?.()}
  </div>
{:else}
  <DialogPrimitive.Title bind:ref {level} class={classes} {...restProps}>
    {@render children?.()}
  </DialogPrimitive.Title>
{/if}
