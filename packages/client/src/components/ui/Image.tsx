import { styled } from "@/theme";

export const Image = styled("img", {
	width: "100%",
	borderRadius: "$basic",
	variants: {
		style: {
			default: {},
			cover: {
				borderBottomLeftRadius: "$none",
				borderBottomRightRadius: "$none",
			},
		},
	},
	defaultVariants: {
		style: "default",
	},
});
