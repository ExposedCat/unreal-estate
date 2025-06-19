import { Container } from "@chakra-ui/react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<Container maxW="1200px" py={8}>
				<Outlet />
			</Container>
			<TanStackRouterDevtools />
		</>
	),
});
