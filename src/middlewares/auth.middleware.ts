import { NextFunction, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config";
import { User } from "../interfaces/user";
import { Request } from "../interfaces/auth";
import { UnauthenticatedError } from "../errors/unauthenticatedError";
import { ForbiddenError } from "../errors/forbiddenError";

/**
 * The provided TypeScript function `auth` is used for authentication by verifying a Bearer token in
 * the request headers and extracting the user ID from the decoded token.
 * @param {Request} req - Request object containing information about the HTTP request
 * @param {Response} res - The `res` parameter in the `auth` function stands for the response object.
 * It is used to send the HTTP response back to the client making the request. This object contains
 * methods and properties that allow you to send data, set headers, and manage the response sent by the
 * server.
 * @param {NextFunction} next - The `next` parameter in the `auth` function is a callback function that
 * is used to pass control to the next middleware function in the stack. It is typically called within
 * the middleware function to indicate that it has completed its processing and the next middleware
 * function should be called.
 * @returns In the provided code snippet, if the token is not successfully decoded or if there is an
 * error during the authentication process, the function does not explicitly return anything. Instead,
 * it either calls `next()` to proceed to the next middleware function in the request-response cycle or
 * it returns early from the function without performing any further actions.
 */
export function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(new UnauthenticatedError("Unauthenticated"));

  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {

    return next(new UnauthenticatedError("Unauthenticated"));

  }

  try {

    const user = verify(token[1], config.jwt.secret!) as User;

    req.user = user;
    next();
  } catch (error) {

    next(new UnauthenticatedError("Unauthenticated"));
  }

}

export function authorize(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user!;

    if (!user.role.includes(role)) {
      return next(new ForbiddenError("Forbidden"));
    }

    next();
  };
}
