import { type Static, Type } from "@sinclair/typebox";
import { WithError } from "../common";

export const Session_Get_Response_Schema = WithError(Type.Null());

export type Session_Get_Response = Static<typeof Session_Get_Response_Schema>;
