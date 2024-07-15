import * as TodoModel from "../model/todos.model";
import { Todo } from "../interfaces/todo";
import { NotFoundError } from "../errors/notFoundError";

export const getTodos = (userId: string) => {
  const data = TodoModel.getTodos(userId);
  return data;
};

export const getTodosById = (id: string, userId: string) => {
  const data = TodoModel.getTodosById(id, userId);
  if (!data) {
    throw new NotFoundError(`todo with id ${id} not found`);
  }
  return data;
};

export const addTodo = (todo: Todo, userId: string) => {
  const data = TodoModel.addTodo(todo, userId);
  return data;
};

export const deleteTodo = (id: string, userId: string) => {
  if (!getTodosById(id, userId)) {
    throw new NotFoundError(`todo with id ${id} not found`);
  }
  const data = TodoModel.deleteTodo(id, userId);
  return data;
};

export const updateTodo = (id: string, todo: Todo, userId: string) => {
  const data = TodoModel.updateTodo(id, todo, userId);
  if (!data) {
    throw new NotFoundError(`todo with id ${id} not found`);
  }
  return data;
};
