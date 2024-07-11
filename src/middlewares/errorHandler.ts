import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/badRequestError";
import { ForbiddenError } from "../errors/forbiddenError";
import { NotFoundError } from "../errors/notFoundError";
import { InternalServerError } from "../errors/internalServerError";
import { UnauthenticatedError } from "../errors/unauthenticatedError";

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something went wrong";

  if (err instanceof BadRequestError) {
    statusCode = StatusCodes.BAD_REQUEST;
    message = err.message;
  } else if (err instanceof ForbiddenError) {
    statusCode = StatusCodes.FORBIDDEN;
    message = err.message;
  } else if (err instanceof NotFoundError) {
    statusCode = StatusCodes.NOT_FOUND;
    message = err.message;
  } else if (err instanceof InternalServerError) {
    statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    message = err.message;
  } else if (err instanceof UnauthenticatedError) {
    statusCode = StatusCodes.UNAUTHORIZED;
    message = err.message;
  }

  res.status(statusCode).json({ error: message });
}
