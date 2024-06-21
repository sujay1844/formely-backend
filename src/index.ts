import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  DeleteEntryById,
  EditEntryById,
  ReadAllEntriesIds,
  ReadEntryById,
  SubmitEntry,
} from "./routes/entry";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/ping", (_, res) => {
  res.send("True");
});

app.post("/submit", SubmitEntry);
app.get("/read", ReadAllEntriesIds);
app.get("/read/:id", ReadEntryById);
app.put("/edit/:id", EditEntryById);
app.delete("/delete/:id", DeleteEntryById);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port 8080");
});
