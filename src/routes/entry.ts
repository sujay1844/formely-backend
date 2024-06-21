import { Request, Response } from "express";
import {
  AddEntry,
  DeleteEntry,
  GetAllEntriesIds,
  GetEntryById,
  UpdateEntry,
} from "../db/entry";
import { NewFormEntry } from "../db/schema";

const SubmitEntry = async (req: Request, res: Response) => {
  const body = req.body as NewFormEntry;

  const id = await AddEntry(body);
  if (!id) {
    res.status(400).json({ message: "Entry not added" });
    return;
  }

  res.status(201).json({
    message: "Entry added successfully",
  });
};

const ReadAllEntriesIds = async (_: Request, res: Response) => {
  const ids = await GetAllEntriesIds();
  if (!ids) {
    res.status(404).json({ message: "Entries not found" });
    return;
  }

  res.status(200).json({ ids: ids });
};

const ReadEntryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const entry = await GetEntryById(id);
  if (!entry) {
    res.status(404).json({ message: "Entry not found" });
    return;
  }

  res.status(200).json(entry);
};

const EditEntryById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body as NewFormEntry;

  const updated = await UpdateEntry(id, body);
  if (!updated) {
    res.status(400).json({ message: "Entry not updated" });
    return;
  }

  res.status(200).json({
    message: "Entry updated successfully",
  });
};

const DeleteEntryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deleted = await DeleteEntry(id);
  if (!deleted) {
    res.status(400).json({ message: "Entry not deleted" });
    return;
  }

  res.status(200).json({
    message: "Entry deleted successfully",
  });
};

export {
  SubmitEntry,
  ReadAllEntriesIds,
  ReadEntryById,
  EditEntryById,
  DeleteEntryById,
};
