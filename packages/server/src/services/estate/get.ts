import { ObjectId } from "mongodb";
import type { Estate, ServiceResponse, WithId } from "pronajemik-common";
import { failure, success } from "pronajemik-common";
import type { Database } from "../database";

const SEARCH_PAGE_SIZE = 20;

export type GetEstateArgs = {
	database: Database;
	estateId: string;
};

export async function getEstate({
	database,
	estateId,
}: GetEstateArgs): Promise<ServiceResponse<WithId<Estate>>> {
	const estate = await database.estates.findOne({
		_id: new ObjectId(estateId),
	});
	if (!estate) {
		return failure("Estate not found");
	}
	const { _id, ...data } = estate;
	return success({
		id: _id.toString(),
		...data,
	});
}

export type SearchEstatesArgs = {
	database: Database;
	page?: number;
};

export async function searchEstates({
	database,
	page = 1,
}: SearchEstatesArgs): Promise<
	ServiceResponse<{
		entries: WithId<Estate>[];
		totalPages: number;
	}>
> {
	const [result] = await database.estates
		.aggregate([
			{
				$facet: {
					entries: [
						{ $skip: (page - 1) * SEARCH_PAGE_SIZE },
						{ $limit: SEARCH_PAGE_SIZE },
						{ $addFields: { id: "$_id" } },
					],
					totalPages: [
						{ $count: "count" },
						{
							$project: {
								total: {
									$cond: [
										{ $gt: ["$count", 0] },
										{ $ceil: { $divide: ["$count", SEARCH_PAGE_SIZE] } },
										0,
									],
								},
							},
						},
					],
				},
			},
		])
		.toArray();

	return success({
		entries: result?.entries ?? [],
		totalPages: result?.totalPages.at(0)?.total ?? 0,
	});
}
