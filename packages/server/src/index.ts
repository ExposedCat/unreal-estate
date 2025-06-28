import { Elysia } from "elysia";

import { RequireBase } from "./middlewares/base.js";
import { RequireErrorHandler } from "./middlewares/error.js";
import { RequireErrorFallback } from "./middlewares/fallback.js";
import { GET_EstateRoute } from "./routes/estate.get.js";
import { GET_EstatesRoute } from "./routes/estates.get.js";
import { POST_EstatesRoute } from "./routes/estates.post.js";
import { POST_LoginRoute } from "./routes/login.post.js";
import { POST_RegisterRoute } from "./routes/register.post.js";
import { GET_SessionRoute } from "./routes/session.get.js";

const app = new Elysia()
	.use(RequireErrorHandler)
	.use(RequireBase)
	// Public
	.use(POST_LoginRoute)
	.use(POST_RegisterRoute)
	// Private
	.use(GET_SessionRoute)
	.use(GET_EstatesRoute)
	.use(GET_EstateRoute)
	.use(POST_EstatesRoute)
	//
	.use(RequireErrorFallback)
	.listen(process.env.PORT || 8080);

console.log(
	`🏠 Pronajemik API is running at http://${app.server?.hostname}:${app.server?.port}`,
);
