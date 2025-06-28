import { type Static, Type } from "@sinclair/typebox";
import { AuthResponseSchema } from "../auth";
import { WithError } from "../common";

export const Login_Post_Body_Schema = Type.Object({
	email: Type.String(),
	password: Type.String(),
});
export type Login_Post_Body = Static<typeof Login_Post_Body_Schema>;

export const Login_Post_Response_Schema = WithError(AuthResponseSchema);
export type Login_Post_Response = Static<typeof Login_Post_Response_Schema>;
