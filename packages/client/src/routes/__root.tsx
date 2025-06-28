import { Page } from "@/components/layout";
import { Button, Label } from "@/components/ui";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
	notFoundComponent: () => (
		<Page>
			<Label text="Uh-oh.." size="large" />
			<Label text="Page not found!" size="large" />
			<Link to="/dashboard">
				<Button label="Go to Dashboard" />
			</Link>
		</Page>
	),
});
