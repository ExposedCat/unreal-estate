import type { RegisterRequest, ServiceResponse } from "pronajemik-common";
import { failure, success } from "pronajemik-common";
import type { Database } from "../database";

export type RegisterUserArgs = {
	database: Database;
} & RegisterRequest;

export async function registerUser(
	args: RegisterUserArgs,
): Promise<ServiceResponse<string>> {
	const { database, email, password } = args;

	const existingUser = await database.users.findOne({ email });

	if (existingUser) {
		return failure("User already exists");
	}

	const hashedPassword = await Bun.password.hash(password);

	const result = await database.users.insertOne({
		email,
		password: hashedPassword,
	});

	return success(result.insertedId.toString());
}
