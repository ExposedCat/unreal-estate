import { Column, Page } from "@/components/layout";
import { Button, Label } from "@/components/ui";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: () => (
		<Page>
			<Label text="Find Your Perfect Property" size="large" />
			<Column css={{ maxWidth: "$lg" }}>
				<Label
					text="Discover the best real estate deals with our advanced filtering system. Whether you're buying or renting, we help you find exactly what you're looking for."
					align="center"
				/>
			</Column>
			<Column gap="sm">
				<Link to="/dashboard">
					<Button label="Search Properties" />
				</Link>
				<Label text="Over 10,000+ properties available" size="small" />
			</Column>
		</Page>
	),
});
