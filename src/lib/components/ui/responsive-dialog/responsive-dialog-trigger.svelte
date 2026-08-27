<script lang="ts">
  import {
    Dialog as DialogPrimitive,
    Popover as PopoverPrimitive,
  } from "bits-ui"
  import { getResponsiveDialogContext } from "./context.js"

  // `children` and the `child` snippet both ride through restProps, so
  // `{#snippet child({ props })}` works exactly as it does on the primitives.
  let {
    ref = $bindable(null),
    ...restProps
  }: DialogPrimitive.TriggerProps = $props()

  const context = getResponsiveDialogContext()
</script>

{#if context.primitive === "popover"}
  <PopoverPrimitive.Trigger bind:ref {...restProps} />
{:else}
  <DialogPrimitive.Trigger bind:ref {...restProps} />
{/if}
