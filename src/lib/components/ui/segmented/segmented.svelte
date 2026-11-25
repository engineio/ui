<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { cn, type WithElementRef } from "../../../utils.js";

	// The rail the pill tabs sit in, opened up to anything: dropdown and
	// popover triggers styled with `segmentVariants`, a `TabsList` with
	// `class="h-8 bg-transparent p-0"`, or a mix. It scrolls sideways rather
	// than wrapping, like the tabs it copies.
	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
	bind:this={ref}
	class={cn(
		"flex h-10 max-w-full items-center overflow-x-auto rounded-control bg-grey-850 p-1",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
