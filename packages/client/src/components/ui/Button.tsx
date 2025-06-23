import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";
import { Label } from "./Typography";

const StyledInput = styled("button", {
	borderRadius: "$full",
	borderWidth: "$thin",
	borderBottomWidth: "$thick",
	borderColor: "$border-default",
	borderStyle: "solid",
	cursor: "pointer",
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

type ButtonProps = ComponentProps<typeof StyledInput> & {
	label: string;
};

export const Button: React.FC<ButtonProps> = ({
	label,
	onClick,
	disabled,
	...props
}) => {
	return (
		<StyledInput onClick={disabled ? undefined : onClick} {...props}>
			<Label text={label} />
		</StyledInput>
	);
};
