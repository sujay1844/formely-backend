import { Router } from "express";
import { NewForm } from "../db/types";
import { GetForm, InsertForm } from "../db/form";

const FormRouter = Router();

FormRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const form = await GetForm(id);
  res.status(200).json(form);
});

FormRouter.post("/", async (req, res) => {
  const body = req.body as NewForm;
  const id = await InsertForm(body);

  res.status(201).json({ id });
});

export default FormRouter;
