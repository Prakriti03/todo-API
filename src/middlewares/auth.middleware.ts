import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config";

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
export function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    next(new Error("unauthenticated"));
    return;
  }

  const token = authorization.split(" ");

  if (token.length !== 2 || token[0] !== "Bearer") {
    next(new Error("Unauthenticated"));

    return;
  }

  const decoded = verify(token[1], config.jwt.secret!) as JwtPayload;
  if (!decoded) {
    return;
  }


  req.headers.userId = decoded.id;
  next();
}
