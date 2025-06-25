import { Page, Row } from "@/components/layout";
import { EstateCard } from "@/components/partials/EstateCard";
import { Card, Label } from "@/components/ui";
import { useRequest } from "@/hooks";
import { requireAuth } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";

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
			<Label text="Search Apartments" size="large" />
			{isLoading && (
				<Card color="warning">
					<Label text="Loading..." />
				</Card>
			)}
			{isError && (
				<Card color="error">
					<Label text={`Failed to load apartments: ${error}`} />
				</Card>
			)}
			{isSuccess && (
				<Row gap="sm" css={{ flexWrap: "wrap" }}>
					{data.entries.map((entry) => (
						<EstateCard key={entry.url} estate={entry} />
					))}
				</Row>
			)}
		</Page>
	);
}

export const Route = createFileRoute("/search")({
	beforeLoad: requireAuth,
	component: SearchPage,
});
