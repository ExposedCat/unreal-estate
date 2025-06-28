import { BackIcon, ConfigureIcon } from "@/components/icons";
import { Column, Page, Row } from "@/components/layout";
import { EstateCard } from "@/components/partials/EstateCard";
import { Alert, Button, Card, Label } from "@/components/ui";
import { InteractiveMap } from "@/components/ui/Map";
import { useRequest } from "@/hooks";
import { requireAuth } from "@/utils";
import { DEFAULT_MAP_CENTER, DEFAULT_MAP_ZOOM } from "@/utils/constants";
import { Link, createFileRoute } from "@tanstack/react-router";
import type { Estate, WithId } from "pronajemik-common";

const EstatesView: React.FC<{ estates: WithId<Estate>[] }> = ({ estates }) => {
	return (
		<Row full align="unset" justify="unset" css={{ minHeight: 0 }}>
			<Column
				align="unset"
				justify="unset"
				gap="sm"
				full
				css={{
					overflowY: "auto",
					padding: "$sm",
					minHeight: 0,
				}}
			>
				<Card
					borderless
					full
					direction="row"
					justify="evenly"
					css={{
						maxWidth: "unset",
					}}
				>
					<Button label="2+1, 2+kk, 3+1" />
					<Button label="> 25 m²" />
					<Button label="1000 Kč - 8000 Kč" />
					<Button label="No RK" />
					<Button label="No Deposit" />
					<Button icon contents={<ConfigureIcon />} />
				</Card>
				<Row
					gap="sm"
					css={{
						width: "$full",
						display: "grid",
						gridTemplateColumns: "repeat(auto-fit, minmax($sm, 1fr))",
					}}
				>
					{estates.map((estate) => (
						<EstateCard key={estate.id} estate={estate} />
					))}
				</Row>
			</Column>
			<Row
				full
				css={{
					borderRadius: "$basic",
					borderWidth: "$thin",
					borderBottomWidth: "$thick",
					borderStyle: "solid",
					borderColor: "$border-default",
					overflow: "clip",
					width: "40%",
					marginRight: "$sm",
					marginTop: "$sm",
					height: "calc(100% - $space$md)",
				}}
			>
				<InteractiveMap
					center={DEFAULT_MAP_CENTER}
					zoom={DEFAULT_MAP_ZOOM}
					zoomable
				/>
			</Row>
		</Row>
	);
};

function SearchPage() {
	const { isLoading, isError, isSuccess, data, error } = useRequest(
		"GET",
		"/estates",
		{
			params: { page: 1 },
		},
	);

	return (
		<Page full screen paddingLess>
			<Row gap="md">
				<Link to="/dashboard">
					<Button
						contents={
							<>
								<BackIcon />
								<Label text="Dashboard" />
							</>
						}
					/>
				</Link>
				<Label text="Search Apartments" size="large" />
			</Row>

			{isLoading && <Alert color="warning" label="Loading..." />}
			{isError && (
				<Alert color="error" label={`Failed to load apartments: ${error}`} />
			)}
			{isSuccess && <EstatesView estates={data.entries} />}
		</Page>
	);
}

export const Route = createFileRoute("/estates/")({
	beforeLoad: requireAuth,
	component: SearchPage,
});
