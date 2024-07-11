import express from "express";
import router from "./routes/index.routes";
import  config  from "./config";
import { errorHandler } from "./middlewares/errorHandler";
import { requestLogger } from "./middlewares/logger";

const app = express();

//middleware
app.use(express.json());
app.use(requestLogger);

app.use(router);

app.get("/", (req, res) => {
  res.send("Hello to Todo App");
});

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server listening on port : ${config.port}`);
});
