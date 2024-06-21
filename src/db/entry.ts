import { ObjectId } from "mongodb";
import { db } from ".";
import { FormEntry, NewFormEntry } from "./schema";

async function AddEntry(entry: NewFormEntry) {
  const res = await db.collection("entries").insertOne(entry);
  return res.insertedId.toHexString();
}

async function GetAllEntriesIds() {
  try {
    const res = (await db.collection("entries").find({}).toArray()).map(
      (entry) => entry._id.toHexString()
    );
    return res as string[] | null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function GetEntryById(id: string) {
  try {
    const res = await db
      .collection("entries")
      .findOne({ _id: new ObjectId(id) });
    return res as FormEntry | null;
  } catch (e) {
    console.log(e);
    return null;
  }
}

async function UpdateEntry(id: string, entry: NewFormEntry) {
  try {
    const res = await db
      .collection("entries")
      .updateOne({ _id: new ObjectId(id) }, { $set: entry });
    return res.modifiedCount === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function DeleteEntry(id: string) {
  try {
    const res = await db
      .collection("entries")
      .deleteOne({ _id: new ObjectId(id) });
    return res.deletedCount === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export { AddEntry, GetAllEntriesIds, GetEntryById, UpdateEntry, DeleteEntry };
