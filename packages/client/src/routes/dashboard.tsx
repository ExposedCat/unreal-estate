import { Page, Row } from "@/components/layout";
import { Button, Label } from "@/components/ui";
import { useSession } from "@/hooks";
import { requireAuth } from "@/utils";
import { Link, createFileRoute } from "@tanstack/react-router";

function DashboardPage() {
	const { logout } = useSession();

	return (
		<Page>
			<Label text="Dashboard" size="header" />
			<Label text="Welcome to your protected dashboard!" />
			<Row gap="sm">
				<Button label="Logout" onClick={logout} />
				<Link to="/estates">
					<Button label="Search" />
				</Link>
			</Row>
		</Page>
	);
}

export const Route = createFileRoute("/dashboard")({
	beforeLoad: requireAuth,
	component: DashboardPage,
});
