import { type Static, Type } from "@sinclair/typebox";
import { WithError } from "../common";
import { EstateSchema } from "../entities/estate";

export const Estates_Get_Response_Schema = WithError(
	Type.Object({
		page: Type.Number(),
		totalPages: Type.Number(),
		entries: Type.Array(EstateSchema),
	}),
);
export type Estates_Get_Response = Static<typeof Estates_Get_Response_Schema>;

export const Estates_Get_Params_Schema = Type.Object({
	page: Type.Optional(Type.Number({ minimum: 1 })),
});
export type Estates_Get_Params = Static<typeof Estates_Get_Params_Schema>;
