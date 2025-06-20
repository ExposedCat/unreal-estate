import { type Static, Type } from "@sinclair/typebox";
import { ErrorResponseSchema, SuccessResponseSchema } from "../common";
import { EstateSchema, ParsedEstateSchema } from "../entities/estate";

export const ManualEstateRequestSchema = Type.Object({
	kind: Type.Literal("manual"),
	data: EstateSchema,
});
export type ManualEstateRequest = Static<typeof ManualEstateRequestSchema>;

export const ParsedEstateRequestSchema = Type.Object({
	kind: Type.Literal("parsed"),
	data: ParsedEstateSchema,
});
export type ParsedEstateRequest = Static<typeof ParsedEstateRequestSchema>;

export const EstateRequestSchema = Type.Union([
	ManualEstateRequestSchema,
	ParsedEstateRequestSchema,
]);
export type EstateRequest = Static<typeof EstateRequestSchema>;

export const EstateResponseSchema = Type.Union([
	SuccessResponseSchema(Type.Null()),
	ErrorResponseSchema,
]);
export type EstateResponse = Static<typeof EstateResponseSchema>;
