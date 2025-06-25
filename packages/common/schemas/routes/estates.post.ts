import { type Static, Type } from "@sinclair/typebox";
import { WithError } from "../common";
import { EstateSchema, ParsedEstateSchema } from "../entities/estate";

export const Estates_Post_Manual_Schema = Type.Object({
	kind: Type.Literal("manual"),
	data: EstateSchema,
});
export type Estates_Post_Manual = Static<typeof Estates_Post_Manual_Schema>;

export const Estates_Post_Parsed_Schema = Type.Object({
	kind: Type.Literal("parsed"),
	data: ParsedEstateSchema,
});
export type Estates_Post_Parsed = Static<typeof Estates_Post_Parsed_Schema>;

export const Estates_Post_Body_Schema = Type.Union([
	Estates_Post_Manual_Schema,
	Estates_Post_Parsed_Schema,
]);
export type Estates_Post_Body = Static<typeof Estates_Post_Body_Schema>;

export const Estates_Post_Response_Schema = WithError(Type.Null());
export type Estates_Post_Response = Static<typeof Estates_Post_Response_Schema>;
