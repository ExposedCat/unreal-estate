import type { Static, TSchema } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import type { ApiEndpoints, HttpMethod } from "../services/requests";
import { request } from "../services/requests";

type UseRequestOptions<TResponse extends TSchema> = {
	paused?: boolean;
	queryKey?: string[];
	enabled?: boolean;
	responseSchema: TResponse;
	params?: Record<string, string | number | boolean>;
	headers?: Record<string, string>;
};

type UseRequestResult<TResponse extends TSchema> = {
	data: Static<TResponse> | undefined;
	error: string | null;
	loading: boolean;
	refetch: () => void;
	reset: () => void;
};

export function useRequest<
	E extends ApiEndpoints,
	TResponse extends TSchema = TSchema,
>(
	method: HttpMethod,
	endpoint: E,
	options: UseRequestOptions<TResponse>,
): UseRequestResult<TResponse> {
	const {
		paused,
		queryKey,
		enabled = true,
		responseSchema,
		params,
		headers,
	} = options;

	const hasAutoExecuted = useRef(false);
	const shouldPause = paused !== undefined ? paused : method !== "GET";

	const queryKeyArray = queryKey || [
		method,
		endpoint,
		JSON.stringify({ params, headers }),
	];

	const validateAndRequest = useCallback(async () => {
		const result = await request(method, endpoint, {
			params,
			headers,
		} as Parameters<typeof request<E>>[2]);

		if (!Value.Check(responseSchema, result)) {
			const errors = [...Value.Errors(responseSchema, result)];
			throw new Error(`Response validation failed: ${JSON.stringify(errors)}`);
		}

		return result as Static<TResponse>;
	}, [method, endpoint, responseSchema, params, headers]);

	if (method === "GET") {
		const queryResult = useQuery({
			queryKey: queryKeyArray,
			queryFn: validateAndRequest,
			enabled: enabled && !shouldPause,
		});

		const refetch = useCallback(() => {
			queryResult.refetch();
		}, [queryResult]);

		return {
			data: queryResult.data,
			error:
				queryResult.error instanceof Error ? queryResult.error.message : null,
			loading: queryResult.isLoading,
			refetch,
			reset: refetch,
		};
	}

	const mutationResult = useMutation({
		mutationKey: queryKeyArray,
		mutationFn: validateAndRequest,
	});

	const refetch = useCallback(() => {
		mutationResult.mutate();
	}, [mutationResult]);

	const reset = useCallback(() => {
		mutationResult.reset();
		hasAutoExecuted.current = false;
	}, [mutationResult]);

	useEffect(() => {
		if (!shouldPause && !hasAutoExecuted.current && enabled) {
			hasAutoExecuted.current = true;
			refetch();
		}
	}, [shouldPause, enabled, refetch]);

	return {
		data: mutationResult.data,
		error:
			mutationResult.error instanceof Error
				? mutationResult.error.message
				: null,
		loading: mutationResult.isPending,
		refetch,
		reset,
	};
}
