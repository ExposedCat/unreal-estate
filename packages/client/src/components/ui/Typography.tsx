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
				fontSize: "$large",
				fontWeight: "$bold",
				color: "$black",
			},
			header: {
				fontSize: "$header",
				fontWeight: "$bold",
				color: "$black",
				fontFamily: "Raleway",
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
		weight: {
			unset: {},
			normal: {
				fontWeight: "$normal",
			},
			bold: {
				fontWeight: "$bold",
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
		noWrap: {
			true: {
				whiteSpace: "nowrap",
			},
			false: {
				whiteSpace: "normal",
			},
		},
	},
	defaultVariants: {
		size: "normal",
		color: "primary",
		align: "left",
		weight: "unset",
		noWrap: false,
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
