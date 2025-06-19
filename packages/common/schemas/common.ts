import { type Static, type TSchema, Type } from "@sinclair/typebox";

export type ServiceResponse<T> =
	| {
			ok: true;
			error: null;
			data: T;
	  }
	| {
			ok: false;
			error: string;
			data: null;
	  };

export const SuccessResponseSchema = <T extends TSchema>(dataSchema: T) =>
	Type.Object({
		ok: Type.Literal(true),
		error: Type.Null(),
		data: dataSchema,
	});

export const ErrorResponseSchema = Type.Object({
	ok: Type.Literal(false),
	error: Type.String(),
	data: Type.Null(),
});

export type ErrorResponse = Static<typeof ErrorResponseSchema>;
