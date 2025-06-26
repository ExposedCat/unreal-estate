import type React from "react";
import { Column } from "./Flex";

export type PageProps = {
	align?: "center" | "start";
};

export const Page: React.FC<React.PropsWithChildren<PageProps>> = ({
	children,
	align = "center",
}) => {
	return (
		<Column
			css={{
				width: "$full",
				minHeight: "$full",
				background: "$bg-canvas",
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
