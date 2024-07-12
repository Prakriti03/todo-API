import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import loggerWithNameSpace from "../utils/logger";
import { BadRequestError } from "../errors/badRequestError";
import { NotFoundError } from "../errors/notFoundError";
import { GetUserByQuery } from "../interfaces/user";

const logger = loggerWithNameSpace("UserController");

/**
 * The function `createUser` handles the creation of a user by calling a service function, sending a
 * response with the created user data, and logging the event.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `createUser` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this case, it is being used to send a JSON response with a status code of 201 (CREATED)
 * @param {NextFunction} next - The `next` parameter in the `createUser` function is a function that is
 * used to pass control to the next middleware function in the request-response cycle. If an error
 * occurs during the execution of the `createUser` function, the `next` function is called with the
 * error as an argument
 */
export async function createUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { body } = req;
  try {
    await UserService.createUser(body);
    res.status(StatusCodes.CREATED).json(body);
    logger.info(`User with email ${body.email} created`);
  } catch (error) {
    next(error);
  }
}

/**
 * The function `getUsers` retrieves user data using a UserService and sends it as a JSON response with
 * an OK status code, handling errors by passing them to the next middleware.
 * @param {Request} req - Request object from the Express.js framework, containing information about
 * the HTTP request being made. It includes properties such as headers, body, query parameters, and
 * more.
 * @param {Response} res - The `res` parameter in the `getUsers` function is an object representing the
 * HTTP response that the server sends back to the client. It allows you to send data, set headers, and
 * control the response status.
 * @param {NextFunction} next - The `next` parameter in the `getUsers` function is a reference to the
 * next middleware function in the application's request-response cycle. It is used to pass control to
 * the next middleware function when an error occurs or when the current function has completed its
 * task. If an error occurs in the `
 */
export function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = UserService.getUsers();
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * The function `getUserbyId` retrieves a user by their ID from a UserService and sends the user data
 * in the response or a "User not found" error if the user is not found.
 * @param {Request} req - The `req` parameter in the `getUserbyId` function stands for the request
 * object. It contains information about the HTTP request that triggered the function, such as request
 * headers, parameters, body, and more. In this case, `req.params` is used to extract the `id`
 * parameter
 * @param {Response} res - The `res` parameter in the function `getUserbyId` is an object representing
 * the HTTP response that the Express application sends when it receives an HTTP request. It is used to
 * send a response back to the client making the request.
 * @param {NextFunction} next - The `next` parameter in the function `getUserbyId` is a callback
 * function that is used to pass errors to the Express error handling middleware. If an error occurs
 * during the execution of the function, it is passed to `next(error)` to trigger the error handling
 * process in Express. This allows
 */
export function getUserbyId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  try {
    const data = UserService.getUserbyId(id);

    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export function getUserbyQuery(query: GetUserByQuery){
  const q = query
}

/**
 * The function updateUser updates a user based on the provided user ID and request body, returning the
 * updated user data or throwing a BadRequestError if the update fails.
 * @param {Request} req - The `req` parameter in the `updateUser` function is the request object
 * representing the HTTP request made to the server. It contains information such as the request
 * headers, parameters, body, and other details sent by the client. In this function, `req` is used to
 * extract the user ID
 * @param {Response} res - The `res` parameter in the `updateUser` function is an instance of the
 * Express Response object. It is used to send a response back to the client making the request. In
 * this case, the function is sending a JSON response with the updated user data and a status code of
 * 200 (
 * @param {NextFunction} next - The `next` parameter in the `updateUser` function is a function that is
 * used to pass control to the next middleware function in the request-response cycle. It is typically
 * used to handle errors or to move to the next middleware function in case of successful execution. In
 * this case, if an error
 */
export async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id: userId } = req.params;
    const { body: updatedUser } = req;
    const user = UserService.updateUser(userId, updatedUser);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * The function deleteUser deletes a user based on the provided id and returns an error if the user is
 * not found.
 * @param {Request} req - The `req` parameter in the `deleteUser` function stands for the request
 * object. It contains information about the HTTP request made to the server, such as the request
 * headers, parameters, body, and other details. In this case, `req.params` is used to extract the `id`
 * @param {Response} res - The `res` parameter in the function `deleteUser` is an object representing
 * the HTTP response that the server sends back to the client. It allows you to send data, set headers,
 * and control the response status. In this specific function, `res` is used to send a JSON response
 * with
 * @param {NextFunction} next - The `next` parameter in the function `deleteUser` is a callback
 * function that is used to pass control to the next middleware function in the request-response cycle.
 * It is typically used to handle errors or to move to the next middleware function in the chain. If an
 * error occurs during the processing of
 * @returns the data of the deleted user if the deletion was successful. If the user with the specified
 * id is not found, it will return a "User with id {id} not found" error message.
 */
export function deleteUser(req: Request, res: Response, next: NextFunction) {

  const { id } = req.params;
  const data = UserService.deleteUser(id);
  if (!data) {
    next(new NotFoundError(`User with id ${id} not found`));
    return;
  }
  res.status(StatusCodes.OK).json(data);
}
