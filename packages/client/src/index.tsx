import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryProvider } from "./providers/QueryProvider";
import { routeTree } from "./routeTree.gen";
import { applyGlobalStyles } from "./theme";

const router = createRouter({ routeTree });

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
			<RouterProvider router={router} />
		</QueryProvider>
	</StrictMode>,
);
