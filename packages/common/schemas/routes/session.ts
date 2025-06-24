import { type Static, Type } from "@sinclair/typebox";
import { ErrorResponseSchema, SuccessResponseSchema } from "../common";

export const SessionResponseSchema = Type.Union([
	SuccessResponseSchema(Type.Null()),
	ErrorResponseSchema,
]);

export type SessionResponse = Static<typeof SessionResponseSchema>;
