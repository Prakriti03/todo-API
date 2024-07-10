import * as TodoModel from "../model/todos";
import { Todo } from "../interfaces/todo";

export const getTodos = (userId : string) => {
  const data = TodoModel.getTodos(userId);
  return data;
};

export const getTodosById = (id: string, userId : string) => {
  const data = TodoModel.getTodosById(id, userId);
  return data;
};

export const addTodo = (todo: Todo, userId: string) => {
  const data = TodoModel.addTodo(todo, userId);
  return data;
};

export const deleteTodo = (id: string, userId : string) => {
  const data = TodoModel.deleteTodo(id, userId);
  return data;
};

export const updateTodo = (id: string, todo: Todo, userId: string) => {
  const data = TodoModel.updateTodo(id, todo, userId);
  return data;
};
