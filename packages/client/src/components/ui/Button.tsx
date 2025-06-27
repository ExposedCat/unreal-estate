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
	paddingInline: "$md",
	paddingBlock: "$sm",
	backgroundColor: "$bg-surface",
	display: "flex",
	gap: "$sm",
	alignItems: "center",
	justifyContent: "center",
	variants: {
		icon: {
			true: {
				width: "$xxs",
				height: "calc($xxs + $borderWidths$thin)",
				padding: "$xs",
			},
		},
		width: {
			normal: {},
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
	label?: string;
	contents?: React.ReactNode;
};

export const Button: React.FC<ButtonProps> = ({
	label,
	contents,
	onClick,
	disabled,
	...props
}) => {
	return (
		<StyledInput onClick={disabled ? undefined : onClick} {...props}>
			{label && <Label text={label} />}
			{contents}
		</StyledInput>
	);
};
