import { Elysia } from "elysia";
import type { Estates_Get_Response } from "pronajemik-common";

import { Estates_Get_Params_Schema, success } from "pronajemik-common";
import { RequireAuth } from "../middlewares/auth";
import { searchEstates } from "../services/estate/get";

export const GET_EstatesRoute = new Elysia({ name: "Route.GetEstates" })
	.use(RequireAuth)
	.get(
		"/estates",
		async ({ database, query }): Promise<Estates_Get_Response> => {
			const result = await searchEstates({
				database,
				page: query.page ?? 1,
			});
			if (!result.ok) {
				return result;
			}
			return success({
				page: query.page ?? 1,
				...result.data,
			});
		},
		{
			query: Estates_Get_Params_Schema,
		},
	);
