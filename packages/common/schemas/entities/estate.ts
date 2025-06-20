import { type Static, Type } from "@sinclair/typebox";

export const EstateSchema = Type.Object({
	rentBase: Type.Union([Type.Number(), Type.Null()]),
	fees: Type.Union([Type.Number(), Type.Null()]),
	rent2Person: Type.Union([Type.Number(), Type.Null()]),
	fees2Person: Type.Union([Type.Number(), Type.Null()]),
	rkPaid: Type.Union([Type.Boolean(), Type.Null()]),
	rkPrice: Type.Union([Type.Number(), Type.Null()]),
	depositPaid: Type.Union([Type.Boolean(), Type.Null()]),
	depositPrice: Type.Union([Type.Number(), Type.Null()]),
	electricityPaid: Type.Union([Type.Boolean(), Type.Null()]),
	electricityPrice: Type.Union([Type.Number(), Type.Null()]),
	url: Type.Union([Type.String(), Type.Null()]),
});
export type Estate = Static<typeof EstateSchema>;

export const ParsedEstateSchema = Type.Object({
	url: Type.Union([Type.String(), Type.Null()]),
	rent_base: Type.Union([Type.Number(), Type.Null()]),
	fees_base: Type.Union([Type.Number(), Type.Null()]),
	rent_2_person: Type.Union([Type.Number(), Type.Null()]),
	fees_2_person: Type.Union([Type.Number(), Type.Null()]),
	is_provision_RK_paid: Type.Union([Type.Boolean(), Type.Null()]),
	provision_RK_price: Type.Union([Type.Number(), Type.Null()]),
	is_deposit_paid: Type.Union([Type.Boolean(), Type.Null()]),
	deposit_price: Type.Union([Type.Number(), Type.Null()]),
	is_electricity_paid: Type.Union([Type.Boolean(), Type.Null()]), // FIXME: Legacy field name!
	electricity_price: Type.Union([Type.Number(), Type.Null()]),
});
export type ParsedEstate = Static<typeof ParsedEstateSchema>;
