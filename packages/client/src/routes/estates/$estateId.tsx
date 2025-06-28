import { BackIcon } from "@/components/icons";
import { Column, Page, Row } from "@/components/layout";
import { Alert, Button, Card, Label } from "@/components/ui";
import { useRequest } from "@/hooks";
import { Link, createFileRoute, useParams } from "@tanstack/react-router";

function EstateIdPage() {
	const { estateId } = useParams({ from: "/estates/$estateId" });
	const { isLoading, isError, isSuccess, error, data } = useRequest(
		"GET",
		"/estate",
		{ params: { estateId } },
	);

	return (
		<Page color="alternative">
			{isLoading && <Alert color="warning" label="Loading..." />}
			{isError && <Alert color="error" label={error} />}
			{isSuccess && (
				<>
					<Row gap="md">
						<Link to="/estates">
							<Button
								contents={
									<>
										<BackIcon />
										<Label text="Search" />
									</>
								}
							/>
						</Link>
						<Label
							text={`${data.address.street} ${data.layout.rooms}${data.layout.kitchenCorner ? "+kk" : "+1"} ${data.area} m²`}
							size="large"
						/>
					</Row>
					<Card direction="row" gap="lg" justify="separated">
						<Row>
							<Column>
								<Label
									text={`${data.price.rentBase + data.price.fees}`}
									size="large"
								/>
								<Label
									text={`${(data.price.depositPrice ?? 0) + (data.price.rkPrice ?? 0)}`}
									size="large"
								/>
							</Column>
							<Column>
								<Label text="" size="large">
									<Label text="/month" />
								</Label>
								<Label text="" size="large">
									<Label text=" once" />
								</Label>
							</Column>
						</Row>
						<Label
							text={`${(data.price.depositPrice ?? 0) + (data.price.rkPrice ?? 0) + data.price.rentBase}`}
							size="large"
						>
							<Label text="/first month" />
						</Label>
					</Card>
				</>
			)}
		</Page>
	);
}

export const Route = createFileRoute("/estates/$estateId")({
	component: EstateIdPage,
});
