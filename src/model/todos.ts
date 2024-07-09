import { Todo } from "../interfaces/todo";

let todos = [
  {
    id: "1",
    title: "Wash dishes",
    completed: false,
  },
  {
    id: "2",
    title: "Do Laundry",
    completed: true,
  },
];

export const getTodos = (): Todo[] => {
  return todos;
};

export const getTodosById = (id: string) => {
  const data = todos.find(({ id: todoId }) => todoId === id);
  return data;
};

export const addTodo = (todo: Omit<Todo, "id">) => {
  todos.push({
    id: `${todos.length + 1}`,
    ...todo,
  });
  return todos;
};

export const deleteTodo = (id: string): Todo[] => {
  todos = todos.filter((todo) => todo.id !== id);
  return todos;
};

export const updateTodo = (id: string, todo: Todo): Todo => {
  let todoToUpdate = getTodosById(id);

  todoToUpdate = { ...todoToUpdate, ...todo };

  todos = [...todos.filter(({ id: todoId }) => todoId != id), todoToUpdate];

  return todoToUpdate;
};
