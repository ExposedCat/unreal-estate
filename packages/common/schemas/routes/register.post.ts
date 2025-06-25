import { type Static, Type } from "@sinclair/typebox";
import { AuthResponseSchema } from "../auth";
import { WithError } from "../common";

export const Register_Post_Body_Schema = Type.Object({
	email: Type.String({ format: "email" }),
	password: Type.String({ minLength: 6 }),
});
export type Register_Post_Body = Static<typeof Register_Post_Body_Schema>;

export const Register_Post_Response_Schema = WithError(AuthResponseSchema);
export type Register_Post_Response = Static<
	typeof Register_Post_Response_Schema
>;
