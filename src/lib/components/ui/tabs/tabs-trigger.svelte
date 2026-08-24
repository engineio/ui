<script lang="ts">
	import { Tabs as TabsPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	// Must match the variant set on the enclosing TabsList.
	let {
		ref = $bindable(null),
		class: className,
		variant = "pill",
		...restProps
	}: TabsPrimitive.TriggerProps & { variant?: "pill" | "underline" } = $props();
</script>

<TabsPrimitive.Trigger
	bind:ref
	class={cn(
		"inline-flex cursor-pointer items-center justify-center whitespace-nowrap font-semibold",
		"transition-colors duration-140 ease-brand",
		"focus-visible:ring-ring focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
		"disabled:pointer-events-none disabled:opacity-38",
		variant === "pill"
			? "rounded-control px-4 py-1.5 text-[13px] hover:text-foreground data-[state=active]:bg-white data-[state=active]:text-background"
			: // The marker is a bottom border on the trigger itself, so it sits on
				// the list's hairline rather than floating above it.
				"-mb-px border-b-2 border-transparent px-0 pb-2.5 text-[15px] hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-foreground",
		className
	)}
	{...restProps}
/>
