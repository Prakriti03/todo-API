import express from "express";
import {authentication,authorize} from "../middlewares/auth.middleware"
import {
  getTodos,
  getTodosById,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controller/todoController";
import { validateReqBody } from "../middlewares/validator.middleware";
import { createTodoBodySchema, updateTodoBodySchema } from "../schema/todo.schema";

const router = express();

router.get("/", authentication,getTodos);

router.get("/:id", authentication, getTodosById);

router.post("/", authentication,validateReqBody(createTodoBodySchema), addTodo);

router.delete("/:id", authentication, deleteTodo);

router.put("/:id", authentication,validateReqBody(updateTodoBodySchema), updateTodo);

export default router;
