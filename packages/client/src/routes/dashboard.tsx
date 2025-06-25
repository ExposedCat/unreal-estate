import { Page } from "@/components/layout";
import { Button, Label } from "@/components/ui";
import { useSession } from "@/hooks";
import { requireAuth } from "@/utils";
import { createFileRoute } from "@tanstack/react-router";

function DashboardPage() {
	const { logout } = useSession();

	return (
		<Page>
			<Label text="Dashboard" size="large" />
			<Label text="Welcome to your protected dashboard!" />
			<Button label="Logout" onClick={logout} />
		</Page>
	);
}

export const Route = createFileRoute("/dashboard")({
	beforeLoad: requireAuth,
	component: DashboardPage,
});
