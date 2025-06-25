import type { Estate } from "pronajemik-common";
import { Row } from "../layout";
import { Card, Label } from "../ui";

export type EstateCardProps = {
	estate: Estate;
};

export const EstateCard: React.FC<EstateCardProps> = ({ estate }) => {
	return (
		<Card css={{ minWidth: "$sm", minHeight: "$xs" }}>
			<Row gap="md">
				<Label text="Base rent" />
				<Label text={estate.rentBase} />
			</Row>
			<Row gap="md">
				<Label text="Monthly fees" />
				<Label text={estate.fees ?? "None"} />
			</Row>
			<Row gap="md">
				<Label text="Electricity" />
				<Label
					text={
						estate.electricityPrice ??
						(estate.electricityPaid ? "Paid" : "None")
					}
				/>
			</Row>
		</Card>
	);
};
