import express from "express";
import {
  getTodos,
  getTodosById,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controller/todoController";

const router = express();

router.get("/", getTodos);

router.get("/:id", getTodosById);

router.post("/", addTodo);

router.delete("/:id", deleteTodo);

router.put("/:id", updateTodo);

export default router;
