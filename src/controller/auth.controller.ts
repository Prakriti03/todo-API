import { NextFunction, Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import { StatusCodes } from "http-status-codes";
import { UnauthenticatedError } from "../errors/unauthenticatedError";
import { BadRequestError } from "../errors/badRequestError";
import loggerWithNameSpace from "../logger";
import { InternalServerError } from "../errors/internalServerError";
import { nextTick } from "process";
import { log } from "console";

const logger = loggerWithNameSpace("AuthController");

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

  if (!refreshToken) {
    throw new BadRequestError("Refresh token is required");
  }

  try {
    const tokens = AuthService.refreshToken(refreshToken);
    logger.info(`Refresh token request for ${refreshToken}`);
    if (!tokens) {
      throw new UnauthenticatedError("Invalid refresh token");
    }

    res.status(StatusCodes.OK).json(tokens);
  } catch (error) {
    next(error);
  }
}
