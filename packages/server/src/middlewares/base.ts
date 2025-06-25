import cors from "@elysiajs/cors";
import { jwt as jwtPlugin } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";
import { createDbConnection } from "../services/database";

export const RequireBase = new Elysia({ name: "Middleware.Base" })
	.use(
		cors({
			origin: true,
			credentials: true,
		}),
	)
	.use(
		jwtPlugin({
			name: "jwt",
			// FIXME: Move to env
			secret: "Shnirbity Shnorble",
			schema: t.Object({
				userId: t.String(),
			}),
		}),
	)
	.decorate(
		"database",
		await createDbConnection(
			process.env.DB_CONNECTION_URL ?? "mongodb://127.0.0.1:27017",
		),
	);
