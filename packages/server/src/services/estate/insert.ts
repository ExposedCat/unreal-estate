import type { Estate, ParsedEstate, ServiceResponse } from "pronajemik-common";
import { failure, success } from "pronajemik-common";
import type { Database } from "../database";

export type InsertEstateArgs = {
	database: Database;
	estate: Estate;
};

export async function insertEstate({
	database,
	estate,
}: InsertEstateArgs): Promise<ServiceResponse<string>> {
	const result = await database.estates.insertOne(estate);
	if (!result.insertedId) {
		return failure("Failed to insert estate");
	}
	return success(result.insertedId.toString());
}

export const formatParserOutput = (output: ParsedEstate): Estate => ({
	...output,
	price: {
		rentBase: output.price.rent_base ?? 0,
		fees: output.price.fees_base ?? 0,
		rent2Person: output.price.rent_2_person ?? 0,
		fees2Person: output.price.fees_2_person ?? 0,
		rkPaid: output.price.is_provision_RK_paid ?? false,
		rkPrice: output.price.provision_RK_price,
		depositPaid: output.price.is_deposit_paid ?? false,
		depositPrice: output.price.deposit_price,
		electricityPaid: output.price.is_electricity_paid ?? false,
		electricityPrice: output.price.electricity_price,
	},
});
