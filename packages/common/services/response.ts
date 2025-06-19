import type { ServiceResponse, ErrorResponse } from "../schemas/common";

export const success = <D>(data: D): ServiceResponse<D> => ({
	ok: true,
	error: null,
	data,
});

export const failure = (error: string): ErrorResponse => ({
	ok: false,
	error,
	data: null,
});
