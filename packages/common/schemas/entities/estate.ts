import { type Static, Type } from "@sinclair/typebox";

export const EstateSchema = Type.Object({
	images: Type.Array(Type.String()),
	area: Type.Number(),
	address: Type.Object({
		street: Type.String(),
		city: Type.String(),
		district: Type.Optional(Type.String()),
	}),
	layout: Type.Object({
		rooms: Type.Number(),
		kitchenCorner: Type.Boolean(),
	}),
	price: Type.Object({
		rentBase: Type.Number(),
		fees: Type.Number(),
		rent2Person: Type.Number(),
		fees2Person: Type.Number(),
		rkPaid: Type.Boolean(),
		rkPrice: Type.Union([Type.Number(), Type.Null()]),
		depositPaid: Type.Boolean(),
		depositPrice: Type.Union([Type.Number(), Type.Null()]),
		electricityPaid: Type.Boolean(),
		electricityPrice: Type.Union([Type.Number(), Type.Null()]),
	}),
	url: Type.Optional(Type.String()),
});
export type Estate = Static<typeof EstateSchema>;

export const ParsedPriceSchema = Type.Object({
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
export type ParsedPrice = Static<typeof ParsedPriceSchema>;

export const ParsedEstateSchema = Type.Intersect([
	Type.Omit(EstateSchema, Type.Literal("price")),
	Type.Object({
		price: ParsedPriceSchema,
	}),
]);
export type ParsedEstate = Static<typeof ParsedEstateSchema>;
