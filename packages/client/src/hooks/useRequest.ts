import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import type {
	ApiEndpoints,
	RequestOptions,
	ResponseData,
	ValidMethods,
} from "../services/requests";
import { request } from "../services/requests";

type UseRequestOptions<E extends ApiEndpoints, M extends ValidMethods<E>> = {
	paused?: boolean;
	queryKey?: string[];
	enabled?: boolean;
} & Omit<RequestOptions<E, M>, "headers"> & {
		headers?: Record<string, string>;
	};

type ExtractServiceData<T> = T extends { ok: true; data: infer D } ? D : never;

type UseRequestResultCommon = {
	refetch: () => void;
	reset: () => void;
};

type UseRequestResultLoading = UseRequestResultCommon & {
	isLoading: true;
	isError: false;
	isSuccess: false;
	data: undefined;
	error: null;
};

type UseRequestResultError = UseRequestResultCommon & {
	isLoading: false;
	isError: true;
	isSuccess: false;
	data: undefined;
	error: string;
};

type UseRequestResultSuccess<D> = UseRequestResultCommon & {
	isLoading: false;
	isError: false;
	isSuccess: true;
	data: D;
	error: null;
};

type UseRequestResult<E extends ApiEndpoints, M extends ValidMethods<E>> =
	| UseRequestResultLoading
	| UseRequestResultError
	| UseRequestResultSuccess<ExtractServiceData<ResponseData<E, M>>>;

type ServiceResponseLike<T> =
	| { ok: true; error: null; data: T }
	| { ok: false; error: string; data: null };

function isServiceResponse<T>(data: unknown): data is ServiceResponseLike<T> {
	return (
		typeof data === "object" &&
		data !== null &&
		"ok" in data &&
		"error" in data &&
		"data" in data
	);
}

export function useRequest<E extends ApiEndpoints, M extends ValidMethods<E>>(
	method: M,
	endpoint: E,
	options: UseRequestOptions<E, M> = {} as UseRequestOptions<E, M>,
): UseRequestResult<E, M> {
	const { paused, queryKey, enabled = true, params, body, headers } = options;

	const hasAutoExecuted = useRef(false);
	const shouldPause = paused !== undefined ? paused : method !== "GET";

	const queryKeyArray = queryKey || [
		method,
		endpoint,
		JSON.stringify({ params, body, headers }),
	];

	const validateAndRequest = useCallback(async () => {
		const result = await request(method, endpoint, {
			params,
			body,
			headers,
		} as RequestOptions<E, M>);

		return result;
	}, [method, endpoint, params, body, headers]);

	if (method === "GET") {
		const queryResult = useQuery({
			queryKey: queryKeyArray,
			queryFn: validateAndRequest,
			enabled: enabled && !shouldPause,
		});

		const refetch = useCallback(() => {
			queryResult.refetch();
		}, [queryResult]);

		if (!enabled || shouldPause) {
			return {
				isLoading: true,
				isError: false,
				isSuccess: false,
				data: undefined,
				error: null,
				refetch,
				reset: refetch,
			};
		}

		if (queryResult.isLoading) {
			return {
				isLoading: true,
				isError: false,
				isSuccess: false,
				data: undefined,
				error: null,
				refetch,
				reset: refetch,
			};
		}

		if (queryResult.error instanceof Error) {
			return {
				isLoading: false,
				isError: true,
				isSuccess: false,
				data: undefined,
				error: queryResult.error.message,
				refetch,
				reset: refetch,
			};
		}

		if (
			!isServiceResponse<ExtractServiceData<ResponseData<E, M>>>(
				queryResult.data,
			)
		) {
			throw new Error("API did not return a valid ServiceResponse shape");
		}
		const serviceResponse = queryResult.data as ServiceResponseLike<
			ExtractServiceData<ResponseData<E, M>>
		>;

		if (serviceResponse.ok) {
			return {
				isLoading: false,
				isError: false,
				isSuccess: true,
				data: serviceResponse.data,
				error: null,
				refetch,
				reset: refetch,
			};
		}
		return {
			isLoading: false,
			isError: true,
			isSuccess: false,
			data: undefined,
			error: serviceResponse.error ?? "Unknown error",
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

	if (!enabled || shouldPause) {
		return {
			isLoading: true,
			isError: false,
			isSuccess: false,
			data: undefined,
			error: null,
			refetch,
			reset,
		};
	}

	if (mutationResult.isPending) {
		return {
			isLoading: true,
			isError: false,
			isSuccess: false,
			data: undefined,
			error: null,
			refetch,
			reset,
		};
	}

	if (mutationResult.error instanceof Error) {
		return {
			isLoading: false,
			isError: true,
			isSuccess: false,
			data: undefined,
			error: mutationResult.error.message,
			refetch,
			reset,
		};
	}

	if (
		!isServiceResponse<ExtractServiceData<ResponseData<E, M>>>(
			mutationResult.data,
		)
	) {
		throw new Error("API did not return a valid ServiceResponse shape");
	}
	const serviceResponse = mutationResult.data as ServiceResponseLike<
		ExtractServiceData<ResponseData<E, M>>
	>;

	if (serviceResponse.ok) {
		return {
			isLoading: false,
			isError: false,
			isSuccess: true,
			data: serviceResponse.data,
			error: null,
			refetch,
			reset,
		};
	}
	return {
		isLoading: false,
		isError: true,
		isSuccess: false,
		data: undefined,
		error: serviceResponse.error ?? "Unknown error",
		refetch,
		reset,
	};
}
