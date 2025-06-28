import { styled } from "@/theme";

export const CardOutline = styled("div", {
	position: "relative",
	display: "inline-block",

	"&::before": {
		content: '""',
		position: "absolute",
		inset: 0,
		border: "2px dashed $border-default",
		borderRadius: "$basic",
		opacity: 0,
		transition: "opacity 0.18s ease",
		pointerEvents: "none",
		zIndex: 0,
	},

	"&:hover": {
		"&::before": {
			opacity: 1,
		},
		"& > *": {
			transform: "translate(-4px, -4px)",
		},
	},

	"& > *": {
		position: "relative",
		zIndex: 1,
		transition: "transform 0.18s ease",
	},
});
