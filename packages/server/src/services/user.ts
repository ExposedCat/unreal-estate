import { ObjectId } from "mongodb";

import type { Database } from "./database";

export type User = {
	password: string;
};

export type LoginUserArgs = {
        database: Database;
        login: string;
        password: string;
};

export type RegisterUserArgs = {
       database: Database;
       login: string;
       password: string;
};

export async function loginUser(args: LoginUserArgs) {
        const { database, login, password } = args;

	const user = await database.users.findOne({ user: login });
	if (!user) {
		return null;
	}

	const passwordCorrect = password === user.password;
	if (!passwordCorrect) {
		return null;
	}

        return user._id.toString();
}

export async function registerUser(args: RegisterUserArgs) {
       const { database, login, password } = args;

       const existing = await database.users.findOne({ user: login });
       if (existing) {
               return null;
       }

       const result = await database.users.insertOne({ user: login, password });
       return result.insertedId.toString();
}

export type GetUserArgs = {
	database: Database;
	userId: string;
};

export async function getUser({ database, userId }: GetUserArgs) {
	try {
		return await database.users.findOne({ _id: new ObjectId(userId) });
	} catch {
		return null;
	}
}
