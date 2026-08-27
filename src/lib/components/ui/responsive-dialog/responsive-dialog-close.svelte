<script lang="ts">
  import {
    Dialog as DialogPrimitive,
    Popover as PopoverPrimitive,
  } from "bits-ui"
  import { getResponsiveDialogContext } from "./context.js"

  let {
    ref = $bindable(null),
    ...restProps
  }: DialogPrimitive.CloseProps = $props()

  const context = getResponsiveDialogContext()
</script>

{#if context.primitive === "popover"}
  <PopoverPrimitive.Close bind:ref {...restProps} />
{:else}
  <DialogPrimitive.Close bind:ref {...restProps} />
{/if}
