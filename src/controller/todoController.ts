import { Request, Response } from "express";
import * as TodoServices from "../services/todoService";
import { error } from "console";

/**
 * The function `getTodos` retrieves todos data and sends it as a JSON response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getTodos` function is an object representing the
 * HTTP response that the server sends back to the client. It allows you to send data, set headers, and
 * manage the response to the client's request.
 */
export const getTodos = (req: Request, res: Response) => {
  const data = TodoServices.getTodos();
  res.json(data);
};

/**
 * This function retrieves a todo item by its ID from a service and sends it as a response, handling
 * the case where the todo is not found.
 * @param {Request} req - The `req` parameter in the function `getTodosById` is of type `Request`,
 * which typically represents the HTTP request in Express.js or similar frameworks. It contains
 * information about the incoming request such as headers, parameters, body, etc.
 * @param {Response} res - The `res` parameter in the function `getTodosById` is an object representing
 * the HTTP response that the Express application sends when it receives an HTTP request. It allows you
 * to send data back to the client making the request, such as JSON data or HTML content.
 * @returns If the `TodoServices.getTodosById(id)` function returns a valid data object for the
 * specified `id`, then that data object will be returned as a JSON response using `res.json(data)`. If
 * the `data` variable is empty or falsy, indicating that the todo was not found, then an error message
 * object `{ error: "Todo not found" }` will be returned as a
 */
export const getTodosById = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = TodoServices.getTodosById(id);

  if (!data) {
    res.json({ error: "Todo not found" });
    return;
  }

  res.json(data);
};

/**
 * The function `addTodo` receives a request, validates a todo object, sets a default value for
 * `completed`, adds the todo using `TodoServices`, and sends back the result in the response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `addTodo` function is an object representing the
 * HTTP response that the server sends back to the client. It is of type `Response`, which is typically
 * provided by a web framework like Express in Node.js. The `res` object has methods like `json()`
 * @returns The function `addTodo` is returning the data object that is the result of adding the todo
 * item using `TodoServices.addTodo(todo)`. This data object is then sent as a JSON response using
 * `res.json(data)`.
 */
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

/**
 * This function deletes a todo item based on the provided id and returns the updated data.
 * @param {Request} req - The `req` parameter in the `deleteTodo` function is of type `Request`, which
 * typically represents the HTTP request in Express.js or similar frameworks. It contains information
 * about the incoming request such as headers, parameters, body, etc.
 * @param {Response} res - The `res` parameter in the `deleteTodo` function is an object representing
 * the HTTP response that the server sends back to the client. It is used to send data back to the
 * client in the form of JSON, HTML, or other formats. In this case, the `res.json(data)`
 */
export const deleteTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  const data = TodoServices.deleteTodo(id);

  res.json(data);
};

/**
 * The function `updateTodo` updates a todo item based on the provided id and request body.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `updateTodo` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this function, `res.json()` is used to send a JSON response containing the updated todo data back to
 * the client
 */
export const updateTodo = (req: Request, res: Response) => {
  const { id } = req.params;
  if (!TodoServices.getTodosById(id)) {
    res.json([]);
  }
  const todo = req.body;
  const data = TodoServices.updateTodo(id, todo);

  res.json([data]);
};
