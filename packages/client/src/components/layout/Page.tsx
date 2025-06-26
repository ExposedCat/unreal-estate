import type React from "react";
import { Column } from "./Flex";

export type PageProps = {
	color?: "main" | "alternative";
	align?: "center" | "start";
};

export const Page: React.FC<React.PropsWithChildren<PageProps>> = ({
	children,
	color = "main",
	align = "center",
}) => {
	return (
		<Column
			css={{
				width: "$full",
				minHeight: "$full",
				background: color === "main" ? "$bg-canvas" : "$bg-canvas-2",
				justifyContent: align === "center" ? "center" : "flex-start",
			}}
		>
			<Column
				css={{
					width: "$full",
					height: "$full",
					padding: "$sm",
					gap: "$md",
					maxWidth: "$maxView",
				}}
			>
				{children}
			</Column>
		</Column>
	);
};
