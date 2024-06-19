import { Router } from "express";
import { validateResponse } from "../db/types";
import { GetForm } from "../db/form";
import { AddResponse, GetResponsesByFormId } from "../db/response";

const ResponseRouter = Router();

ResponseRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  const responses = await GetResponsesByFormId(id);
  if (!responses) {
    res.status(404).json({ message: "Responses not found" });
    return;
  }

  res.status(200).json({ responses });
});

ResponseRouter.post("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body as Record<string, any>;

  const form = await GetForm(id);
  if (!form) {
    res.status(404).json({ message: "Form not found" });
    return;
  }

  const errors = validateResponse(form, body);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  await AddResponse(id, body);

  res.status(201).json({
    message: "Response added successfully",
  });
});

export default ResponseRouter;
