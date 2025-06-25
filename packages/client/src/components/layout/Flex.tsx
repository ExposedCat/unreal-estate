import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

const Flex = styled("div", {
	display: "flex",
	variants: {
		direction: {
			row: { flexDirection: "row" },
			column: { flexDirection: "column" },
		},
		align: {
			start: { alignItems: "flex-start" },
			center: { alignItems: "center" },
			end: { alignItems: "flex-end" },
		},
		justify: {
			start: { justifyContent: "flex-start" },
			center: { justifyContent: "center" },
			end: { justifyContent: "flex-end" },
		},
		gap: {
			none: { gap: "0" },
			xs: { gap: "$xs" },
			sm: { gap: "$sm" },
			md: { gap: "$md" },
			lg: { gap: "$lg" },
			xl: { gap: "$xl" },
		},
	},
	defaultVariants: {
		direction: "row",
		align: "center",
		justify: "center",
		gap: "none",
	},
});

export const Row: React.FC<Omit<ComponentProps<typeof Flex>, "direction">> = (
	props,
) => <Flex direction="row" {...props} />;

export const Column: React.FC<
	Omit<ComponentProps<typeof Flex>, "direction">
> = (props) => <Flex direction="column" {...props} />;
