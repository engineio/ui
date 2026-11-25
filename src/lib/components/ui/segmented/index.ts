import { tv, type VariantProps } from "tailwind-variants";
import Root from "./segmented.svelte";

// One segment of a Segmented rail. Matches the pill TabsTrigger: grey label,
// white fill when active. For a filter, "active" means narrowed away from its
// default, so a rail of untouched filters reads as quiet grey text and an
// applied one stands out the way the selected tab does. The focus ring is
// inset because the rail clips anything outside it.
//
// Put it on the trigger itself (`<DropdownMenu.Trigger class={segmentVariants({ active })}>`)
// and pass `onCloseAutoFocus={(e) => e.preventDefault()}` to the menu content,
// or focus returns to the trigger on close and paints the ring round a
// mouse user's white pill.
const segmentVariants = tv({
	base: [
		"inline-flex h-8 shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-control px-4",
		"text-nav font-semibold",
		"transition-colors duration-140 ease-brand",
		"focus-visible:ring-ring focus-visible:ring-2 focus-visible:ring-inset focus-visible:outline-none",
		"disabled:pointer-events-none disabled:opacity-38",
		"[&_svg]:pointer-events-none [&_svg]:size-3.5 [&_svg]:shrink-0",
	],
	variants: {
		active: {
			true: "bg-foreground text-background",
			false: "text-grey-300 hover:bg-foreground hover:text-background data-[state=open]:bg-foreground data-[state=open]:text-background",
		},
	},
	defaultVariants: { active: false },
});

type SegmentVariants = VariantProps<typeof segmentVariants>;

export {
	Root,
	segmentVariants,
	type SegmentVariants,
	//
	Root as Segmented,
};
