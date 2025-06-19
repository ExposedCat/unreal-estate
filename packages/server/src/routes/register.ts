import { Elysia } from "elysia";
import {
	RegisterRequestSchema,
	type RegisterResponse,
} from "pronajemik-common";

import { success } from "pronajemik-common";
import { RequireBase } from "../middlewares/base";
import { registerUser } from "../services/user/register";

export const RegisterRoute = new Elysia({ name: "Route.Register" })
	.use(RequireBase)
	.post(
		"/register",
		async ({ jwt, body, database }): Promise<RegisterResponse> => {
			const result = await registerUser({ database, ...body });
			if (!result.ok) {
				return result;
			}
			const data = await jwt.sign({ userId: result.data });
			return success(data);
		},
		{ body: RegisterRequestSchema },
	);
