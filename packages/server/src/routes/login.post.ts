import { Elysia } from "elysia";
import {
	Login_Post_Body_Schema,
	type Login_Post_Response,
} from "pronajemik-common";

import { success } from "pronajemik-common";
import { RequireBase } from "../middlewares/base";
import { loginUser } from "../services/user/login";

export const POST_LoginRoute = new Elysia({ name: "Route.PostLogin" })
	.use(RequireBase)
	.post(
		"/login",
		async ({ jwt, body, database }): Promise<Login_Post_Response> => {
			const result = await loginUser({ database, ...body });
			if (!result.ok) {
				return result;
			}
			const data = await jwt.sign({ userId: result.data });
			return success(data);
		},
		{ body: Login_Post_Body_Schema },
	);
