import { Elysia } from "elysia";

export const RequireErrorHandler = new Elysia({
	name: "Middleware.ErrorHandler",
})
	.onError(({ error, set }) => {
		set.status = 200;
		return error instanceof Error && error.cause
			? error.cause
			: {
					ok: false,
					data: null,
					error: error instanceof Error ? error.message : String(error),
				};
	})
	.as("global");
