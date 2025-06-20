import type { Collection } from "mongodb";
import { MongoClient } from "mongodb";
import type { User, Estate } from "pronajemik-common";

export type Database = {
	users: Collection<User>;
	estates: Collection<Estate>;
};

export async function createDbConnection(connectionString: string) {
	const client = new MongoClient(connectionString);
	await client.connect();

	const mongoDb = client.db(process.env.DATABASE_NAME ?? "pronajemik");
	const users = mongoDb.collection<User>("users");
	const estates = mongoDb.collection<Estate>("estates");

	const database: Database = { users, estates };
	return database;
}
