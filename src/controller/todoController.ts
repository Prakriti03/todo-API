import { Request, Response } from "express";
import * as TodoServices from "../services/todoService";
import { error } from "console";

export const getTodos = (req: Request, res: Response) => {
  const data = TodoServices.getTodos();
  res.json(data);
};

export const getTodosById = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = TodoServices.getTodosById(id);

  if (!data) {
    res.json({ error: "Todo not found" });
    return;
  }

  res.json(data);
};

export const addTodo = (req: Request, res: Response) => {
  const todo = req.body;

  if (!todo || !todo.title) {
    res.json({ error: "Todo title is required" });
    return;
  }

  if (todo.completed === undefined) {
    todo.completed = false;
  }

  const data = TodoServices.addTodo(todo);
  res.json(data);
};
export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = TodoServices.deleteTodo(id);

  res.json(data);
};

export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!TodoServices.getTodosById(id)) {
    res.json([]);
  }
  const todo = req.body;
  const data = TodoServices.updateTodo(id, todo);

  res.json([data]);
};
