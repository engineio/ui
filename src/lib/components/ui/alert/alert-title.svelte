<script lang="ts">
  import type { WithElementRef } from "$lib/utils.js"
  import { cn } from "$lib/utils.js"
  import type { HTMLAttributes } from "svelte/elements"

  // Bold 15px Pure White. The title carries the message — the bar only says
  // which kind of message it is, so the words have to work with the colour
  // ignored entirely. "Upload failed." not "Error."
  let {
    ref = $bindable(null),
    class: className,
    level = 5,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    level?: 1 | 2 | 3 | 4 | 5 | 6
  } = $props()
</script>

<div
  role="heading"
  aria-level={level}
  bind:this={ref}
  class={cn(
    "text-[15px] leading-[1.2] font-bold tracking-[-0.01em] text-foreground",
    className,
  )}
  {...restProps}
>
  {@render children?.()}
</div>
