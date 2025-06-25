import { type Static, Type } from "@sinclair/typebox";

export const UserSchema = Type.Object({
	email: Type.String({ format: "email" }),
	password: Type.String(),
});

export type User = Static<typeof UserSchema>;
