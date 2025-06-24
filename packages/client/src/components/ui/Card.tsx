import { styled } from "@/theme";
import { Column } from "../layout/index";

export const Card = styled(Column, {
	borderRadius: "$basic",
	borderWidth: "$thin",
	borderStyle: "solid",
	padding: "$sm",
	gap: "$sm",
	maxWidth: "$lg",
	minWidth: "$md",
	variants: {
		color: {
			default: {
				background: "$bg-surface",
				borderColor: "$border-default",
			},
			info: {
				fontWeight: "$bold",
				background: "color-mix(in oklab, $status-info, white 10%)",
				borderColor: "$status-info",
			},
			success: {
				fontWeight: "$bold",
				background: "color-mix(in oklab, $status-success, white 10%)",
				borderColor: "$status-success",
			},
			warning: {
				fontWeight: "$bold",
				background: "color-mix(in oklab, $status-warning, white 10%)",
				borderColor: "$status-warning",
			},
			error: {
				fontWeight: "$bold",
				background: "color-mix(in oklab, $status-error, white 50%)",
				borderColor: "$status-error",
			},
		},
	},
	defaultVariants: {
		color: "default",
	},
});
