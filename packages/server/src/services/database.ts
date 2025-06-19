import type { Collection } from "mongodb";
import { MongoClient } from "mongodb";
import type { User } from "./user";

export type Database = {
	users: Collection<User>;
};

export async function createDbConnection(connectionString: string) {
	const client = new MongoClient(connectionString);
	await client.connect();

	const mongoDb = client.db(process.env.DATABASE_NAME ?? "unreal-estate");
	const users = mongoDb.collection<User>("users");

	const database: Database = { users };
	return database;
}
