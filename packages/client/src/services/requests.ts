import type { Static, TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import {
	Estates_Get_Params_Schema,
	Estates_Get_Response_Schema,
	Login_Post_Body_Schema,
	Login_Post_Response_Schema,
	Register_Post_Body_Schema,
	Register_Post_Response_Schema,
	Session_Get_Response_Schema,
} from "pronajemik-common";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const ApiSchemas = {
	"/login": {
		POST: {
			body: Login_Post_Body_Schema,
			response: Login_Post_Response_Schema,
		},
	},
	"/register": {
		POST: {
			body: Register_Post_Body_Schema,
			response: Register_Post_Response_Schema,
		},
	},
	"/session": {
		GET: {
			response: Session_Get_Response_Schema,
		},
	},
	"/estates": {
		GET: {
			params: Estates_Get_Params_Schema,
			response: Estates_Get_Response_Schema,
		},
	},
} as const;

export type ApiEndpoints = keyof typeof ApiSchemas;
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type ValidMethods<E extends ApiEndpoints> =
	keyof (typeof ApiSchemas)[E] & HttpMethod;

type EndpointConfig<
	E extends ApiEndpoints,
	M extends ValidMethods<E>,
> = (typeof ApiSchemas)[E] extends Record<M, infer Config> ? Config : never;

type RequestParams<
	E extends ApiEndpoints,
	M extends ValidMethods<E>,
> = EndpointConfig<E, M> extends { params: infer P }
	? P extends TSchema
		? Static<P>
		: never
	: never;

type RequestBody<
	E extends ApiEndpoints,
	M extends ValidMethods<E>,
> = EndpointConfig<E, M> extends { body: infer B }
	? B extends TSchema
		? Static<B>
		: never
	: never;

export type ResponseData<
	E extends ApiEndpoints,
	M extends ValidMethods<E>,
> = EndpointConfig<E, M> extends { response: infer R }
	? R extends TSchema
		? Static<R>
		: never
	: never;

export type RequestOptions<
	E extends ApiEndpoints,
	M extends ValidMethods<E>,
> = {
	headers?: Record<string, string>;
} & (EndpointConfig<E, M> extends { params: TSchema }
	? { params: RequestParams<E, M> }
	: { params?: never }) &
	(EndpointConfig<E, M> extends { body: TSchema }
		? { body: RequestBody<E, M> }
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

export async function request<
	E extends ApiEndpoints,
	M extends ValidMethods<E>,
>(
	method: M,
	endpoint: E,
	options: RequestOptions<E, M> = {} as RequestOptions<E, M>,
): Promise<ResponseData<E, M>> {
	const { params, body, headers = {} } = options;
	const endpointSchemas = ApiSchemas[endpoint];

	if (!(method in endpointSchemas)) {
		throw new Error(`Method ${method} not supported for endpoint ${endpoint}`);
	}

	const schema = endpointSchemas[
		method as keyof typeof endpointSchemas
	] as EndpointConfig<E, M>;

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

		if (
			schema &&
			typeof schema === "object" &&
			"response" in schema &&
			schema.response &&
			typeof schema.response === "object" &&
			"params" in schema.response
		) {
			if (!Value.Check(schema.response as TSchema, responseData)) {
				const errors = [
					...Value.Errors(schema.response as TSchema, responseData),
				];
				console.log(`Response validation failed: ${JSON.stringify(errors)}`);
				throw new Error("Invalid response from the server");
			}
		}

		return responseData as ResponseData<E, M>;
	} catch (error) {
		console.error(`${method} ${endpoint} request failed`, error);
		throw error;
	}
}
