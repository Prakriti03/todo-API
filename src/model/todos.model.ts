import { Todo } from "../interfaces/todo";

let todos: Todo[] = [];

export const getTodos = (userId: string): Todo[] => {
  return todos.filter((todo) => todo.userID === userId);
};

/**
 * The function `getTodosById` retrieves a todo item by its ID from a list of todos.
 * @param {string} id - The `id` parameter in the `getTodosById` function is a string that represents
 * the unique identifier of a todo item. The function searches for a todo item in the `todos` array
 * based on this `id` and returns the matching todo item data.
 * @returns The function `getTodosById` is returning the todo item with the specified `id` from the
 * `todos` array.
 */
export const getTodosById = (id: string, userId: string) => {
  const data = todos.find((todo) => todo.id === id && todo.userID === userId);
  return data;
};

/**
 * The `addTodo` function adds a new todo item to a list of todos with a unique ID.
 * @param todo - The `todo` parameter is an object that represents a new todo item to be added to a
 * list of todos. It is of type `Omit<Todo, "id">`, which means it includes all properties of the
 * `Todo` type except for the `id` property.
 * @returns The function `addTodo` is returning the updated `todos` array after adding a new todo item.
 */
export const addTodo = (todo: Omit<Todo, "id" | "userID">, userId: string) => {
  const userTodos = todos.filter((todo) => todo.userID === userId);

  todos.push({
    id: `${userTodos.length + 1}`,
    userID: userId,
    ...todo,
  });

  return todos.filter((todo) => todo.userID === userId);
};

/**
 * The `deleteTodo` function removes a todo item with a specific id from an array of todos and returns
 * the updated array.
 * @param {string} id - The `id` parameter in the `deleteTodo` function is a string representing the
 * unique identifier of the todo item that needs to be deleted from the list of todos.
 * @returns The `deleteTodo` function is returning an array of `Todo` objects after filtering out the
 * todo with the specified `id`.
 */
export const deleteTodo = (id: string, userId: string): Todo[] => {
  todos = todos.filter((todo) => !(todo.id === id && todo.userID === userId));
  const userTodos = todos.filter((todo) => todo.userID === userId);
  return userTodos;
};

/**
 * The function `updateTodo` updates a specific todo item in a list of todos based on its id.
 * @param {string} id - The `id` parameter in the `updateTodo` function is a string that represents the
 * unique identifier of the todo item that needs to be updated.
 * @param {Todo} todo - The `todo` parameter in the `updateTodo` function represents the updated
 * information for a specific todo item. It typically includes properties such as `title`,
 * `description`, `dueDate`, `priority`, etc., depending on the structure of your `Todo` type. This
 * parameter is used to update
 * @returns The function `updateTodo` is returning the updated todo item after updating it with the new
 * values provided.
 */
export const updateTodo = (id: string, todo: Todo, userId: string): Todo => {
  let todoToUpdate = getTodosById(id, userId);

  todoToUpdate = { ...todoToUpdate, ...todo };

  todos = [...todos.filter(({ id: todoId }) => todoId != id), todoToUpdate];

  return todoToUpdate;
};
