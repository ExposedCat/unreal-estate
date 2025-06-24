import { Elysia } from "elysia";
import { type SessionResponse, success } from "pronajemik-common";

import { RequireAuth } from "../middlewares/auth";

export const SessionRoute = new Elysia({ name: "Route.Session" })
	.use(RequireAuth)
	.get("/session", async (): Promise<SessionResponse> => {
		return success(null);
	});
