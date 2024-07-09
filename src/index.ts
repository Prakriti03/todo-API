import express from "express";
import router from "./routes/index.routes";
import { config } from "./config";

const app = express();

//middleware
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello to Todo App");
});

app.listen(config.port, () => {
  console.log(`Server listening on port : ${config.port}`);
});
