import type { Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import {
	type ErrorResponse,
	LoginRequestSchema,
	LoginResponseSchema,
	RegisterRequestSchema,
	RegisterResponseSchema,
	failure,
} from "pronajemik-common";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const ApiSchemas = {
	"/login": {
		request: LoginRequestSchema,
		response: LoginResponseSchema,
	},
	"/register": {
		request: RegisterRequestSchema,
		response: RegisterResponseSchema,
	},
} as const;

export type ApiEndpoints = keyof typeof ApiSchemas;

export async function post<E extends ApiEndpoints>(
	endpoint: E,
	data: Static<(typeof ApiSchemas)[E]["request"]>,
): Promise<Static<(typeof ApiSchemas)[E]["response"]> | ErrorResponse> {
	const { request: requestSchema, response: responseSchema } =
		ApiSchemas[endpoint];

	if (!Value.Check(requestSchema, data)) {
		const errors = [...Value.Errors(requestSchema, data)];
		console.log(`Request validation failed: ${JSON.stringify(errors)}`);
		return failure("Invalid request data");
	}

	try {
		const response = await fetch(`${BASE_URL}${endpoint}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		const responseData = await response.json();

		if (!Value.Check(responseSchema, responseData)) {
			const errors = [...Value.Errors(responseSchema, responseData)];
			console.log(`Response validation failed: ${JSON.stringify(errors)}`);
			return failure("Invalid response from the server");
		}

		return responseData;
	} catch (error) {
		console.error(`${endpoint} request failed`, error);
		return failure("Unknown error");
	}
}
