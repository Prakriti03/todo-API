import { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/unauthenticatedError";
import { BadRequestError } from "../errors/badRequestError";
import loggerWithNameSpace from "../logger";

const logger = loggerWithNameSpace("AuthController");

/**
 * The `login` function in TypeScript handles user login attempts by calling the `AuthService.login`
 * method and logging the attempt before returning the data or passing any errors to the next
 * middleware.
 * @param {Request} req - The `req` parameter in the `login` function represents the incoming request
 * object. It contains information about the HTTP request made by the client, such as headers,
 * parameters, body, and other details. In this case, it is of type `Request`, which is typically
 * provided by web frameworks like
 * @param {Response} res - The `res` parameter in the `login` function is an object representing the
 * HTTP response that the server sends back to the client. It is used to send data back to the client,
 * set status codes, and perform other operations related to the response.
 * @param {NextFunction} next - The `next` parameter in the `login` function is a reference to the next
 * middleware function in the application's request-response cycle. It is used to pass control to the
 * next middleware function in case of an error or to proceed with the next operation in the middleware
 * chain. If an error occurs during
 */
export async function login(req: Request, res: Response, next : NextFunction) {
  const { body } = req;

  try {
    const data = await AuthService.login(body);
    logger.info(`User login attempt for ${body.email}`);
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

/**
 * The function `refresh` takes a refresh token from the request body, uses it to generate new tokens
 * using `AuthService.refreshToken`, and returns the new tokens in the response.
 * @param {Request} req - Request object containing the request details sent to the server.
 * @param {Response} res - The `res` parameter in the `refresh` function is an object representing the
 * HTTP response that the server sends back to the client. It allows you to send data, set cookies, and
 * control other aspects of the response that the client will receive.
 * @returns If the `refreshToken` is missing from the request body or if the `AuthService.refreshToken`
 * function does not return any tokens, then the function will return without sending any response. If
 * tokens are successfully retrieved from the `AuthService.refreshToken` function, then the tokens will
 * be sent as a JSON response using `res.json(tokens)`.
 */
export function refresh(req: Request, res: Response, next : NextFunction) {
  const { refreshToken } = req.body;

  try {
    const tokens = AuthService.refreshToken(refreshToken);
    logger.info(`Refresh token request for ${refreshToken}`);
    res.status(StatusCodes.OK).json(tokens);
  } catch (error) {
    next(error);
  }
}
