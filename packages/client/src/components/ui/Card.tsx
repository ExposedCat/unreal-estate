import { styled } from "@/theme";
import { Column } from "../layout/index";

export const Card = styled(Column, {
	borderRadius: "$basic",
	background: "$bg-surface",
	borderWidth: "$thin",
	borderColor: "$border-default",
	borderStyle: "solid",
	padding: "$sm",
	gap: "$sm",
	maxWidth: "$lg",
	minWidth: "$md",
});
