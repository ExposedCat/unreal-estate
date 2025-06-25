import type React from "react";
import { Column } from "./Flex";

export const Page: React.FC<React.PropsWithChildren> = ({ children }) => {
	return (
		<Column
			css={{
				width: "$full",
				height: "$full",
				background: "$bg-canvas",
			}}
		>
			<Column
				css={{
					width: "$full",
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
