import { Type } from "@sinclair/typebox";
import { SuccessResponseSchema } from "./common";

export const AuthResponseSchema = SuccessResponseSchema(Type.String());
