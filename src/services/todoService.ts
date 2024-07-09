import * as TodoModel from "../model/todos";
import { Todo } from "../interfaces/todo";

export const getTodos = () => {
  const data = TodoModel.getTodos();
  return data;
};

export const getTodosById = (id: string) => {
  const data = TodoModel.getTodosById(id);
  return data;
};

export const addTodo = (todo: Todo) => {
  const data = TodoModel.addTodo(todo);
  return data;
};

export const deleteTodo = (id: string) => {
  const data = TodoModel.deleteTodo(id);
  return data;
};

export const updateTodo = (id: string, todo: Todo) => {
  const data = TodoModel.updateTodo(id, todo);
  return data;
};
