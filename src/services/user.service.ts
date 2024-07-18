import { error } from "console";
import * as UserModel from "../model/user.model";
import { GetUserQuery, User } from "../interfaces/user";
import bcrypt from "bcrypt";
import { InternalServerError } from "../errors/internalServerError";
import { NotFoundError } from "../errors/notFoundError";
import { ValidationError } from "../errors/validationError";
import { ConflictError } from "../errors/conflictError";
import loggerWithNameSpace from "../utils/logger";
import { userModel } from "../model/user.model";

const logger = loggerWithNameSpace("userService");

export async function getUsers() {
  try {
    const data = await UserModel.userModel.getUsers();
    return data;
  } catch (error) {
    throw error;
  }
}
export function getUserbyId(id: string) {
  try {
    const data = UserModel.getUserbyId(id);

    console.log("Inside service getUserbyId");

    if (!data) {
      throw new NotFoundError(`User with id: ${id} not found`);
    }
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * The function `createUser` in TypeScript creates a new user after validating the input and hashing
 * the password.
 * @param {User} user - The `user` parameter is an object that represents a user and contains the
 * following properties:
 * @returns If the `user` object does not have `email`, `password`, and `name` properties, or if a user
 * with the same email already exists in the database, the function will return without creating a new
 * user.
 */
export async function createUser(user: User) {
  if (!(user.email && user.password && user.name)) {
    throw new ValidationError("Missing required fields: email, password, name");
  }
  const emailCheck = await UserModel.userModel.getUserbyEmail(user.email);

  if (emailCheck) {
    throw new ConflictError(`User with email: ${user.email} already exists`);
  }

  const password = await bcrypt.hash(user.password, 10);

  user.password = password;
  const data = UserModel.userModel.create(user);
  if (data) return { message: "User created successfully" };
}

export function getUserByQuery(query: GetUserQuery) {
  const data = UserModel.userModel.getUsersbyQuery(query);
  console.log("Inside service getuserbyquery");
  return data;
}

export function getUserbyEmail(email: string) {
  try {
    const data = UserModel.userModel.getUserbyEmail(email);

    console.log(`existingUser !!!!!====== ${UserModel.userModel.getUserbyEmail(email)}`)
    return data;
  } catch (error) {
    throw new InternalServerError("Error fetching user by email");
  }
}

export async function updateUser(id: string, updatedUser: User) {
  logger.info(`update user by id`);
  const password = await bcrypt.hash(updatedUser.password, 10);

  updatedUser.password = password;
  const data = UserModel.userModel.update(id, updatedUser);

  return data;
}

export function deleteUser(id: string) {
  logger.info(`delete user by id`);
  const data = UserModel.userModel.deleteUser(id);

  return data;
}
