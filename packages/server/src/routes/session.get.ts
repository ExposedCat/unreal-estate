import { Elysia } from "elysia";
import { type Session_Get_Response, success } from "pronajemik-common";

import { RequireAuth } from "../middlewares/auth";

export const GET_SessionRoute = new Elysia({ name: "Route.GetSession" })
	.use(RequireAuth)
	.get("/session", async (): Promise<Session_Get_Response> => {
		return success(null);
	});
