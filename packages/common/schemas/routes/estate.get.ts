import { type Static, Type } from "@sinclair/typebox";
import { WithError } from "../common";
import { EstateSchema } from "../entities/estate";

export const Estate_Get_Response_Schema = WithError(EstateSchema);
export type Estate_Get_Response = Static<typeof Estate_Get_Response_Schema>;

export const Estate_Get_Params_Schema = Type.Object({
	estateId: Type.String(),
});
export type Estate_Get_Params = Static<typeof Estate_Get_Params_Schema>;
