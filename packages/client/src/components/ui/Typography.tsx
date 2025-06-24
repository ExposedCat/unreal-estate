import { styled } from "@/theme";
import type { ComponentProps } from "@stitches/react";

const StyledLabel = styled("span", {
	variants: {
		size: {
			small: {
				fontSize: "$small",
				fontWeight: "$normal",
				color: "$black",
			},
			normal: {
				fontSize: "$normal",
				fontWeight: "$normal",
				color: "$black",
			},
			large: {
				fontSize: "$header",
				fontWeight: "$bold",
				color: "$black",
			},
		},
		color: {
			primary: {
				color: "$text-primary",
			},
			inverse: {
				color: "$text-inverse",
			},
		},
		align: {
			left: {
				textAlign: "left",
			},
			center: {
				textAlign: "center",
			},
			right: {
				textAlign: "right",
			},
		},
	},
	defaultVariants: {
		size: "normal",
		color: "primary",
		align: "left",
	},
});

type LabelProps = Omit<ComponentProps<typeof StyledLabel>, "children"> & {
	text: React.ReactNode;
};

export const Label: React.FC<React.PropsWithChildren<LabelProps>> = ({
	text,
	children,
	...props
}) => {
	return (
		<StyledLabel {...props}>
			{text}
			{children}
		</StyledLabel>
	);
};
