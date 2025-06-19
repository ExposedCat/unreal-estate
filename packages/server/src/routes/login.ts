import { Elysia } from "elysia";
import { LoginRequestSchema, type LoginResponse } from "pronajemik-common";

import { success } from "pronajemik-common";
import { RequireBase } from "../middlewares/base";
import { loginUser } from "../services/user/login";

export const LoginRoute = new Elysia({ name: "Route.Login" })
	.use(RequireBase)
	.post(
		"/login",
		async ({ jwt, body, database }): Promise<LoginResponse> => {
			const result = await loginUser({ database, ...body });
			if (!result.ok) {
				return result;
			}
			const data = await jwt.sign({ userId: result.data });
			return success(data);
		},
		{ body: LoginRequestSchema },
	);
