import { Elysia } from "elysia";
import { RequireBase } from "../src/middlewares/base";
import { RequireErrorFallback } from "../src/middlewares/fallback";
import { LoginRoute } from "../src/routes/login";
import { RegisterRoute } from "../src/routes/register";

export const app = new Elysia({ aot: false })
	.use(RequireBase)
	// Public
	.use(LoginRoute)
	.use(RegisterRoute)
	// Private
	//
	.use(RequireErrorFallback);

if (process.env.NODE_ENV !== "production") {
	app.listen(process.env.PORT || 8080);
	console.log(
		`🏠 Pronajemik API is running at http://${app.server?.hostname}:${app.server?.port}`,
	);
}

export default app.handle;
