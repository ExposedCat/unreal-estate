import cors from "@elysiajs/cors";
import { jwt as jwtPlugin } from "@elysiajs/jwt";
import { Elysia, t } from "elysia";

import * as common from "pronajemik-common";
console.log("pronajemik-common exports:", common);

import { failure } from "pronajemik-common";
import { createDbConnection } from "../services/database.js";

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
	.on("error", ({ error }) => {
		console.error(error);
		return failure(error.message ?? "Unknown error");
	})
	.decorate(
		"database",
		await createDbConnection(
			process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017",
		),
	);
