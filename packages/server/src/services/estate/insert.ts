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
	url: output.url,
	rentBase: output.rent_base,
	fees: output.fees_base,
	rent2Person: output.rent_2_person,
	fees2Person: output.fees_2_person,
	rkPaid: output.is_provision_RK_paid,
	rkPrice: output.provision_RK_price,
	depositPaid: output.is_deposit_paid,
	depositPrice: output.deposit_price,
	electricityPaid: output.is_electricity_paid,
	electricityPrice: output.electricity_price,
});
