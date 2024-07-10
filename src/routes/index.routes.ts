import express from "express";
import todoRoute from "./todo.routes";
import authRoute from "./auth.routes";
import userRoute from "./user.routes";

const route = express();

route.use("/auth", authRoute);
route.use("/user", userRoute );
route.use("/todos", todoRoute);

export default route;

