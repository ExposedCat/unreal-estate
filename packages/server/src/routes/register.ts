import { Elysia, t } from "elysia";

import { RequireBase } from "../middlewares/base";
import { failure, type RouteResponse, success } from "../services/response";
import { registerUser } from "../services/user";

export const RegisterRoute = new Elysia({ name: "Route.Register" })
        .use(RequireBase)
        .post(
                "/register",
                async ({ database, body }): RouteResponse<null> => {
                        const userId = await registerUser({ database, ...body });
                        if (!userId) {
                                return failure("Registration failed");
                        }
                        return success(null);
                },
                {
                        body: t.Object({
                                login: t.String(),
                                password: t.String(),
                        }),
                },
        );
