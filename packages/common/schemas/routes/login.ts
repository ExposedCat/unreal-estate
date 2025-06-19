import { type Static, Type } from "@sinclair/typebox";
import { AuthResponseSchema } from "../auth";
import { ErrorResponseSchema } from "../common";

export const LoginRequestSchema = Type.Object({
	email: Type.String(),
	password: Type.String(),
});
export type LoginRequest = Static<typeof LoginRequestSchema>;

export const LoginResponseSchema = Type.Union([
	AuthResponseSchema,
	ErrorResponseSchema,
]);
export type LoginResponse = Static<typeof LoginResponseSchema>;
