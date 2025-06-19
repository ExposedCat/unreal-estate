import { type Static, Type } from "@sinclair/typebox";
import { AuthResponseSchema } from "../auth";
import { ErrorResponseSchema, SuccessResponseSchema } from "../common";

export const RegisterRequestSchema = Type.Object({
	email: Type.String({ format: "email" }),
	password: Type.String({ minLength: 6 }),
});
export type RegisterRequest = Static<typeof RegisterRequestSchema>;

export const RegisterResponseSchema = Type.Union([
	AuthResponseSchema,
	ErrorResponseSchema,
]);
export type RegisterResponse = Static<typeof RegisterResponseSchema>;
