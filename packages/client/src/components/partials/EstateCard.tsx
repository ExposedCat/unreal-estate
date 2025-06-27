import { Link } from "@tanstack/react-router";
import type { Estate, WithId } from "pronajemik-common";
import { Column, Row } from "../layout";
import { Card, Image, Label } from "../ui";
import { CardOutline } from "../ui/CardOutline";

export type EstateCardProps = {
	estate: WithId<Estate>;
};

export const EstateCard: React.FC<EstateCardProps> = ({ estate }) => {
	return (
		<Link to="/estates/$estateId" params={{ estateId: estate.id }}>
			<CardOutline>
				<Card
					flat
					css={{
						padding: 0,
						minWidth: "$sm",
						minHeight: "$xs",
						width: "$full",
					}}
				>
					<Image src={estate.images.at(0)} alt="Estate preview" style="cover" />
					<Row full justify="separated" css={{ padding: "$sm" }}>
						<Column align="stretch" css={{ width: "$full", padding: "$sm" }}>
							<Label
								noWrap
								align="left"
								text={`${estate.layout.rooms}${estate.layout.kitchenCorner ? "+kk" : "+1"} ${estate.area} m²`}
							/>
							<Label
								noWrap
								text={`${estate.address.street}, ${estate.address.city}${estate.address.district ? ` ${estate.address.district}` : ""}`}
							/>
						</Column>
						<Label noWrap text={estate.price.rentBase} size="large">
							<Label noWrap text=" Kč/m" />
						</Label>
					</Row>
				</Card>
			</CardOutline>
		</Link>
	);
};
