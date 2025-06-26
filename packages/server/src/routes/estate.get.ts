import { Elysia } from "elysia";
import type { Estate_Get_Response } from "pronajemik-common";

import { Estate_Get_Params_Schema } from "pronajemik-common";
import { RequireAuth } from "../middlewares/auth";
import { getEstate } from "../services/estate/get";

export const GET_EstateRoute = new Elysia({ name: "Route.GetEstate" })
	.use(RequireAuth)
	.get(
		"/estate",
		async ({ database, query }): Promise<Estate_Get_Response> => {
			const result = await getEstate({
				database,
				estateId: query.estateId,
			});
			return result;
		},
		{
			query: Estate_Get_Params_Schema,
		},
	);
