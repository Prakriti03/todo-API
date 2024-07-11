import express from "express";
import {authentication,authorize} from "../middlewares/auth.middleware"
import {
  getTodos,
  getTodosById,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controller/todoController";

const router = express();

router.get("/", authentication, getTodos);

router.get("/:id", authentication, getTodosById);

router.post("/", authentication, addTodo);

router.delete("/:id", authentication, deleteTodo);

router.put("/:id", authentication, updateTodo);

export default router;
