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

export const WithError = <T extends TSchema>(schema: T) =>
	Type.Union([SuccessResponseSchema(schema), ErrorResponseSchema]);

export const IdSchema = Type.Object({
	id: Type.String(),
});

export type Id = Static<typeof IdSchema>;

export const WithIdSchema = <T extends TSchema>(schema: T) =>
	Type.Intersect([schema, IdSchema]);

export type WithId<T> = T & Id;
