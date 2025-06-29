import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { IconContext } from "react-icons/lib";
import { QueryProvider } from "./providers/QueryProvider";
import { routeTree } from "./routeTree.gen";
import { applyGlobalStyles } from "./theme";

const router = createRouter({
	routeTree,
	// Use "fuzzy" later on when each section will have own not-found pages:
	// https://tanstack.com/router/latest/docs/framework/react/guide/not-found-errors
	notFoundMode: "root",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const root = document.getElementById("root");
if (!root) throw new Error("Root element not found");

applyGlobalStyles();

createRoot(root).render(
	<StrictMode>
		<QueryProvider>
			<IconContext.Provider value={{ className: "icon" }}>
				<RouterProvider router={router} />
			</IconContext.Provider>
		</QueryProvider>
	</StrictMode>,
);
