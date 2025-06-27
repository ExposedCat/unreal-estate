import type React from "react";
import { Column } from "./Flex";

export type PageProps = {
	full?: boolean;
	screen?: boolean;
	paddingLess?: boolean;
	color?: "main" | "alternative";
	align?: "center" | "start";
};

export const Page: React.FC<React.PropsWithChildren<PageProps>> = ({
	children,
	full = false,
	screen = false,
	paddingLess = false,
	color = "main",
	align = "center",
}) => {
	return (
		<Column
			css={{
				width: "$full",
				minHeight: screen ? "100vh" : "$full",
				background: color === "main" ? "$bg-canvas" : "$bg-canvas-2",
				justifyContent: align === "center" ? "center" : "flex-start",
			}}
		>
			<Column
				css={{
					width: "$full",
					height: screen ? "100vh" : "$full",
					padding: "$sm",
					paddingInline: paddingLess ? 0 : "$sm",
					paddingBottom: paddingLess ? 0 : "$sm",
					gap: "$md",
					maxWidth: full ? undefined : "$maxView",
				}}
			>
				{children}
			</Column>
		</Column>
	);
};
