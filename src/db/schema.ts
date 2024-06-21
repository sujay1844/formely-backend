import { ObjectId } from "mongodb";

export type FormEntry = {
  _id: ObjectId;
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
};

export type NewFormEntry = Omit<FormEntry, "_id">;
