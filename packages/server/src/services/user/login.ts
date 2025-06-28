import type { Login_Post_Body, ServiceResponse } from "pronajemik-common";
import { failure, success } from "pronajemik-common";
import type { Database } from "../database";

export type LoginUserArgs = {
	database: Database;
} & Login_Post_Body;

export async function loginUser(
	args: LoginUserArgs,
): Promise<ServiceResponse<string>> {
	const { database, email, password } = args;

	const user = await database.users.findOne({ email });
	if (!user) {
		return failure("User not found");
	}

	const passwordCorrect = await Bun.password.verify(password, user.password);
	if (!passwordCorrect) {
		return failure("Incorrect password");
	}

	return success(user._id.toString());
}
