import { ObjectId } from "mongodb";
import type { Estate, ServiceResponse } from "pronajemik-common";
import { failure, success } from "pronajemik-common";
import type { Database } from "../database";

export type GetEstateArgs = {
	database: Database;
	estateId: string;
};

export async function getEstate({
	database,
	estateId,
}: GetEstateArgs): Promise<ServiceResponse<Estate>> {
	const estate = await database.estates.findOne({
		_id: new ObjectId(estateId),
	});
	if (!estate) {
		return failure("Estate not found");
	}
	return success(estate);
}
