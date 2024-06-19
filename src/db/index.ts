import { MongoClient } from "mongodb";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is not set");
}
const client = new MongoClient(process.env.MONGO_URI);
await client.connect();
export const db = client.db("main");
