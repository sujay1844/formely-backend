import { db } from ".";

export async function AddResponse(formId: string, response: string) {
  const res = await db.collection("responses").insertOne({ formId, response });
  return res.insertedId.toHexString();
}
