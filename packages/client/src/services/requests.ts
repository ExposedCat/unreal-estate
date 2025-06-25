import type { Static, TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import {
	Login_Post_Body_Schema,
	Login_Post_Response_Schema,
	Register_Post_Body_Schema,
	Register_Post_Response_Schema,
	Session_Get_Response_Schema,
} from "pronajemik-common";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const ApiSchemas = {
	"/login": {
		request: Login_Post_Body_Schema,
		response: Login_Post_Response_Schema,
	},
	"/register": {
		request: Register_Post_Body_Schema,
		response: Register_Post_Response_Schema,
	},
	"/session": {
		response: Session_Get_Response_Schema,
	},
} as const;

export type ApiEndpoints = keyof typeof ApiSchemas;
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type EndpointConfig<E extends ApiEndpoints> = (typeof ApiSchemas)[E];

type RequestBody<E extends ApiEndpoints> = EndpointConfig<E> extends {
	request: infer R;
}
	? R extends TSchema
		? Static<R>
		: never
	: never;

type ResponseData<E extends ApiEndpoints> = EndpointConfig<E> extends {
	response: infer R;
}
	? R extends TSchema
		? Static<R>
		: never
	: never;

export type RequestOptions<E extends ApiEndpoints> = {
	params?: Record<string, string | number | boolean>;
	headers?: Record<string, string>;
} & (EndpointConfig<E> extends { request: TSchema }
	? { body: RequestBody<E> }
	: { body?: never });

function buildUrl(
	endpoint: string,
	params?: Record<string, string | number | boolean>,
): string {
	const url = new URL(endpoint, BASE_URL);
	if (params) {
		for (const [key, value] of Object.entries(params)) {
			url.searchParams.append(key, String(value));
		}
	}
	return url.toString();
}

export async function request<E extends ApiEndpoints>(
	method: HttpMethod,
	endpoint: E,
	options: RequestOptions<E> = {} as RequestOptions<E>,
): Promise<ResponseData<E>> {
	const { params, body, headers = {} } = options;
	const schema = ApiSchemas[endpoint];

	try {
		const url = buildUrl(endpoint, params);
		const requestHeaders: Record<string, string> = {
			...headers,
		};

		// Add authorization header if token exists
		const token = localStorage.getItem("token");
		if (token) {
			requestHeaders.authorization = token;
		}

		if (body !== undefined) {
			requestHeaders["Content-Type"] = "application/json";
		}

		const response = await fetch(url, {
			method,
			headers: requestHeaders,
			body: body !== undefined ? JSON.stringify(body) : undefined,
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: ${response.statusText}`);
		}

		const responseData = await response.json();

		if (!Value.Check(schema.response, responseData)) {
			const errors = [...Value.Errors(schema.response, responseData)];
			console.log(`Response validation failed: ${JSON.stringify(errors)}`);
			throw new Error("Invalid response from the server");
		}

		return responseData as ResponseData<E>;
	} catch (error) {
		console.error(`${method} ${endpoint} request failed`, error);
		throw error;
	}
}
