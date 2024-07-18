import * as TodoModel from "../model/todos.model";
import { Todo } from "../interfaces/todo";
import { NotFoundError } from "../errors/notFoundError";
import { todoModel } from "../model/todos.model";

export const getTodos = (userId: string) => {
  const data = TodoModel.todoModel.getTodos(userId);
  return data;
};

export const getTodosById = (id: string, userId: string) => {
  const data = TodoModel.todoModel.getTodosById(id, userId);
  if (!data) {
    throw new NotFoundError(`todo with id ${id} not found`);
  }
  return data;
};

export const addTodo = (todo: Todo, userId: string) => {
  const data = TodoModel.todoModel.create(todo, userId);
  return data;
};

export const deleteTodo = (id: string, userId: string) => {
  const data = TodoModel.todoModel.delete(id, userId);
  return data;
};

export const updateTodo = (id: string, todo:Todo,userId: string) => {
  const data = TodoModel.todoModel.update(id, todo,userId);
  return data;
};
