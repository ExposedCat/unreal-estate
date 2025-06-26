import { BackIcon } from "@/components/icons";
import { Page, Row } from "@/components/layout";
import { EstateCard } from "@/components/partials/EstateCard";
import { Alert, Button, Label } from "@/components/ui";
import { useRequest } from "@/hooks";
import { requireAuth } from "@/utils";
import { Link, createFileRoute } from "@tanstack/react-router";

function SearchPage() {
	const { isLoading, isError, isSuccess, data, error } = useRequest(
		"GET",
		"/estates",
		{
			params: { page: 1 },
		},
	);

	return (
		<Page align="start">
			<Row gap="md">
				<Link to="/dashboard">
					<Button icon contents={<BackIcon />} />
				</Link>
				<Label text="Search Apartments" size="large" />
			</Row>

			{isLoading && <Alert color="warning" label="Loading..." />}
			{isError && (
				<Alert color="error" label={`Failed to load apartments: ${error}`} />
			)}
			{isSuccess && (
				<Row gap="sm" css={{ flexWrap: "wrap" }}>
					{data.entries.map((entry) => (
						<EstateCard key={entry.id} estate={entry} />
					))}
				</Row>
			)}
		</Page>
	);
}

export const Route = createFileRoute("/estates/")({
	beforeLoad: requireAuth,
	component: SearchPage,
});
