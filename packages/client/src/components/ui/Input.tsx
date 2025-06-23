import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

const StyledInput = styled("input", {
	borderWidth: "$thin",
	borderStyle: "solid",
	borderColor: "$border-default",
	padding: "$md",
	backgroundColor: "$bg-surface",
	variants: {
		width: {
			normal: { width: "auto" },
			large: { width: "$md" },
			full: { width: "$full" },
		},
		disabled: {
			true: {
				cursor: "not-allowed",
				opacity: 0.9,
			},
		},
	},
	defaultVariants: {
		width: "normal",
	},
	// "&:hover": {
	// 	backgroundColor: "$primaryHover",
	// },
	// "&:active": {
	// 	backgroundColor: "$primaryActive",
	// },
});

export const Input: React.FC<ComponentProps<typeof StyledInput>> = ({
	...props
}) => {
	return <StyledInput {...props} />;
};
