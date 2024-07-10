import express from "express";
import {auth} from "../middlewares/auth.middleware"
import {
  getTodos,
  getTodosById,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../controller/todoController";

const router = express();

router.get("/", auth, getTodos);

router.get("/:id", auth, getTodosById);

router.post("/", auth, addTodo);

router.delete("/:id", auth, deleteTodo);

router.put("/:id", auth, updateTodo);

export default router;
