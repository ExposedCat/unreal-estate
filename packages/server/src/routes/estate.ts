import { Elysia } from "elysia";
import { EstateRequestSchema, type EstateResponse } from "pronajemik-common";

import { success } from "pronajemik-common";
import { RequireAuth } from "../middlewares/auth";
import { formatParserOutput, insertEstate } from "../services/estate/insert";

export const EstateRoute = new Elysia({ name: "Route.Estate" })
	.use(RequireAuth)
	.post(
		"/estate",
		async ({ body, database }): Promise<EstateResponse> => {
			const estateData =
				body.kind === "manual" ? body.data : formatParserOutput(body.data);
			const result = await insertEstate({ database, estate: estateData });
			if (!result.ok) {
				return result;
			}
			return success(null);
		},
		{ body: EstateRequestSchema },
	);
