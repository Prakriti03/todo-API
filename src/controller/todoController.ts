import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import * as TodoServices from "../services/todo.service";
import { StatusCodes } from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { InternalServerError } from "../errors/internalServerError";
import { BadRequestError } from "../errors/badRequestError";
import { nextTick } from "process";

const logger = loggerWithNameSpace("toDoController");

/**
 * The function `getTodos` retrieves todos data and sends it as a JSON response.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `getTodos` function is an object representing the
 * HTTP response that the server sends back to the client. It allows you to send data, set headers, and
 * manage the response to the client's request.
 */
export const getTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;
  try {
    const data = await TodoServices.getTodos(userId as string);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(new InternalServerError("Invalid refresh token"));
  }
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
export const getTodosById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = req.user?.id;
  try {
    const data = await TodoServices.getTodosById(id, userId as string);
    logger.info(`User ${userId} requested todo with id ${id}`);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
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
export const addTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todo = req.body;
  const userId = req.user?.id; //done through middleware

  if (!todo || !todo.title) {
    next(new BadRequestError("todo title is required"));
  }

  if (todo.completed === undefined) {
    todo.completed = "No";
  }

  try {
    const data = await TodoServices.addTodo(todo, userId as string);
    logger.info(`User ${userId} created a new todo `);
    res.status(StatusCodes.CREATED).json(data);
  } catch (error) {
    next(new InternalServerError("Error creating todo"));
  }
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
export const deleteTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const userId = req.user?.id;
  try {
    const data = await TodoServices.deleteTodo(id, userId as string);
    logger.info(`User ${userId} deleted todo of id ${id}`);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * The function `updateTodo` updates a todo item based on the provided id and request body.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `updateTodo` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this function, `res.json()` is used to send a JSON response containing the updated todo data back to
 * the client
 */
export const updateTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const todo = req.body;
    const data = await TodoServices.updateTodo(id,todo, userId as string);
    logger.info(`User ${userId} updated todo of id ${id}`);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
};
