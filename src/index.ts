import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import FormRouter from "./routes/form";
import ResponseRouter from "./routes/response";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/ping", (_, res) => {
  res.send("pong");
});

app.use("/form", FormRouter);
app.use("/response", ResponseRouter);

app.listen(process.env.PORT || 8080, () => {
  console.log("Server is running on port 3000");
});
