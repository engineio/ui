<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"
  import { getResponsiveDialogContext } from "./context.js"

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props()

  const context = getResponsiveDialogContext()
</script>

<!-- The part that pays for the component. A thumb at the bottom of a phone
     wants full-width actions stacked with the primary nearest it, and
     `flex-col-reverse` puts the primary last in the DOM — correct tab order —
     and first on screen. Above the breakpoint the same markup is a right
     aligned row. -->
<div
  bind:this={ref}
  class={cn(
    "flex gap-2",
    context.mode === "sheet"
      ? "flex-col-reverse [&>*]:w-full"
      : "flex-row justify-end",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
