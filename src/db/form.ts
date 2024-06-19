import { ObjectId } from "mongodb";
import { db } from ".";
import { Form, NewForm } from "./types";

export async function InsertForm(form: NewForm) {
  const res = await db.collection("forms").insertOne(form);
  return res.insertedId.toHexString();
}

export async function GetForm(id: string) {
  const form = await db.collection("forms").findOne({ _id: new ObjectId(id) });

  return form as Form;
}
