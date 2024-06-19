import { Router } from "express";
import { NewForm, validateResponse } from "../db/types";
import { GetForm, InsertForm } from "../db/form";

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body as NewForm;
  const id = await InsertForm(body);

  res.status(201).json({ id });
});

router.post("/:id", async (req, res) => {
  const { id } = req.params;
  const body = req.body as NewForm;

  const form = await GetForm(id);
  const errors = validateResponse(form, body);
  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  res.status(201).json({
    message: "Response valid",
  });
});

export default router;
