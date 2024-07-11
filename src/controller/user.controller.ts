import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import { StatusCodes } from "http-status-codes";
import loggerWithNameSpace from "../logger";
import { BadRequestError } from "../errors/badRequestError";
import { NotFoundError } from "../errors/notFoundError";

const logger = loggerWithNameSpace("UserController");

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

export function getUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const data = UserService.getUsers();
    res.status(StatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export function getUserbyId(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;


  try {
    const data = UserService.getUserbyId(id);
    if (data) {
      res.status(StatusCodes.OK).json(data);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
    }
  } catch (error) {
    next(error);
  }
}

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
    next(new BadRequestError("user can't be updated"));
  }
}

export function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const data = UserService.deleteUser(id);
  if (!data) {
    next(new NotFoundError(`User with id ${id} not found`));
    return;
  }
  res.status(StatusCodes.OK).json(data);
}
