<script lang="ts">
  import { cn } from "$lib/utils.js"
  import Check from "@lucide/svelte/icons/check"
  import Minus from "@lucide/svelte/icons/minus"
  import {
    Checkbox as CheckboxPrimitive,
    type WithoutChildrenOrChild,
  } from "bits-ui"

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props()
</script>

<CheckboxPrimitive.Root
  bind:ref
  class={cn(
    "peer box-content size-4 shrink-0 rounded-[6px] border-[1.5px] border-grey-500 transition-colors duration-140 ease-brand data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-38 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-38",
    className,
  )}
  bind:checked
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <div class="flex size-4 items-center justify-center text-current">
      {#if indeterminate}
        <Minus class="size-3.5" />
      {:else}
        <Check class={cn("size-3.5", !checked && "text-transparent")} />
      {/if}
    </div>
  {/snippet}
</CheckboxPrimitive.Root>
