import { Elysia } from "elysia";
import {
	Register_Post_Body_Schema,
	type Register_Post_Response,
} from "pronajemik-common";

import { success } from "pronajemik-common";
import { RequireBase } from "../middlewares/base";
import { registerUser } from "../services/user/register";

export const POST_RegisterRoute = new Elysia({ name: "Route.PostRegister" })
	.use(RequireBase)
	.post(
		"/register",
		async ({ jwt, body, database }): Promise<Register_Post_Response> => {
			const result = await registerUser({ database, ...body });
			if (!result.ok) {
				return result;
			}
			const data = await jwt.sign({ userId: result.data });
			return success(data);
		},
		{ body: Register_Post_Body_Schema },
	);
