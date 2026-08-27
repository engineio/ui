<script lang="ts">
  import { cn } from "$lib/utils.js"
  import { Dialog as DialogPrimitive } from "bits-ui"
  import { getResponsiveDialogContext } from "./context.js"

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: DialogPrimitive.DescriptionProps = $props()

  const context = getResponsiveDialogContext()
  const classes = $derived(cn("text-muted-foreground text-sm", className))
</script>

{#if context.primitive === "popover"}
  <p bind:this={ref} class={classes} {...restProps}>
    {@render children?.()}
  </p>
{:else}
  <DialogPrimitive.Description bind:ref class={classes} {...restProps}>
    {@render children?.()}
  </DialogPrimitive.Description>
{/if}
