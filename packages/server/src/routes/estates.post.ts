import { Elysia } from "elysia";
import {
	Estates_Post_Body_Schema,
	type Estates_Post_Response,
} from "pronajemik-common";

import { success } from "pronajemik-common";
import { RequireAuth } from "../middlewares/auth";
import { formatParserOutput, insertEstate } from "../services/estate/insert";

export const POST_EstatesRoute = new Elysia({ name: "Route.PostEstates" })
	.use(RequireAuth)
	.post(
		"/estates",
		async ({ body, database }): Promise<Estates_Post_Response> => {
			const estateData =
				body.kind === "manual" ? body.data : formatParserOutput(body.data);
			const result = await insertEstate({ database, estate: estateData });
			if (!result.ok) {
				return result;
			}
			return success(null);
		},
		{ body: Estates_Post_Body_Schema },
	);
