import type { ComponentProps } from "@stitches/react";
import { Card } from "./Card";
import { Label } from "./Typography";

type AlertProps = Pick<ComponentProps<typeof Card>, "color"> & {
	label: string;
};

export const Alert: React.FC<AlertProps> = ({ color, label }) => {
	return (
		<Card color={color}>
			<Label text={label} />
		</Card>
	);
};
