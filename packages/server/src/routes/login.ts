import { Elysia, t } from "elysia";

import { RequireBase } from "../middlewares/base";
import { failure, type RouteResponse, success } from "../services/response";
import { loginUser } from "../services/user";

export const LoginRoute = new Elysia({ name: "Route.Login" })
	.use(RequireBase)
	.post(
		"/login",
		async ({ jwt, body, database }): RouteResponse<string> => {
			const userId = await loginUser({ database, ...body });
			if (!userId) {
				return failure("Login failed");
			}
			const data = await jwt.sign({ userId });
			return success(data);
		},
		{
			body: t.Object({
				login: t.String(),
				password: t.String(),
			}),
		},
	);
