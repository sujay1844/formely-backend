import { db } from ".";
import { FormResponse } from "./types";

export async function AddResponse(formId: string, response: FormResponse) {
  const res = await db.collection("responses").insertOne({ formId, response });
  return res.insertedId.toHexString();
}

export async function GetResponsesByFormId(formId: string) {
  try {
    const res = await db.collection("responses").find({ formId }).toArray();
    return res as FormResponse[] | null;
  } catch (e) {
    console.log(e);
    return null;
  }
}
