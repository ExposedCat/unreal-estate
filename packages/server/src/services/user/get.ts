import { ObjectId } from "mongodb";
import type { ServiceResponse, User } from "pronajemik-common";
import { failure, success } from "pronajemik-common";
import type { Database } from "../database";

export type GetUserArgs = {
	database: Database;
	userId: string;
};

export async function getUser({
	database,
	userId,
}: GetUserArgs): Promise<ServiceResponse<User>> {
	const user = await database.users.findOne({ _id: new ObjectId(userId) });
	if (!user) {
		return failure("User not found");
	}
	return success(user);
}
