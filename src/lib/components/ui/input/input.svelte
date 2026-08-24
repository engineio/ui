<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type {
    HTMLInputAttributes,
    HTMLInputTypeAttribute,
  } from "svelte/elements"

  type InputType = Exclude<HTMLInputTypeAttribute, "file">

  type Props = WithElementRef<
    Omit<HTMLInputAttributes, "type"> &
      (
        | { type: "file"; files?: FileList }
        | { type?: InputType; files?: undefined }
      )
  >

  let {
    ref = $bindable(null),
    value = $bindable(),
    type,
    files = $bindable(),
    class: className,
    ...restProps
  }: Props = $props()
</script>

{#if type === "file"}
  <input
    bind:this={ref}
    class={cn(
      "field flex h-10 w-full px-3 py-2 text-[15px] file:border-0 file:bg-transparent file:text-sm file:font-medium",
      className,
    )}
    type="file"
    bind:files
    bind:value
    {...restProps}
  />
{:else}
  <input
    bind:this={ref}
    class={cn(
      "field flex h-10 w-full px-3 py-2 text-[15px] file:border-0 file:bg-transparent file:text-sm file:font-medium",
      className,
    )}
    {type}
    bind:value
    {...restProps}
  />
{/if}
