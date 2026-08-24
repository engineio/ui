<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	// The system ships tabs in two flavours. `pill` is the default because it
	// is what every existing call site already renders; `underline` is the
	// section-level treatment, a hairline rule with a magenta marker under the
	// active tab. Set the same variant on TabsTrigger.
	let {
		ref = $bindable(null),
		class: className,
		variant = "pill",
		...restProps
	}: TabsPrimitive.ListProps & { variant?: "pill" | "underline" } = $props();
</script>

<TabsPrimitive.List
	bind:ref
	class={cn(
		"inline-flex items-center text-grey-300",
		variant === "pill"
			? "h-10 justify-center rounded-control bg-grey-850 p-1"
			: "h-auto w-full justify-start gap-7 border-b border-grey-700",
		className
	)}
	{...restProps}
/>
