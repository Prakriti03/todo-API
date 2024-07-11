import { error } from "console";
import * as UserModel from "../model/user.model";
import { User } from "../interfaces/user";
import bcrypt from "bcrypt";
import { InternalServerError } from "../errors/internalServerError";
import { NotFoundError } from "../errors/notFoundError";
import { ValidationError } from "../errors/validationError";
import { ConflictError } from "../errors/conflictError";

export function getUsers() {
  try{

    const data = UserModel.getUsers();
    return data;
  }catch(error){
    throw new InternalServerError("Error fetching users");
  }
}
export function getUserbyId(id: string) {

  try{

    const data = UserModel.getUserbyId(id);
  
    if (!UserModel.getUserbyId(id)) {
      throw new NotFoundError(`User with id: ${id} not found`);
    }
    return data;
  }catch(error){
    throw new InternalServerError("Error fetching users");
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
    if(!(user.email && user.password && user.name)){
      throw new ValidationError("Missing required fields: email, password, name");;
    }

    try{

      if(UserModel.getUserbyEmail(user.email)){
        throw new ConflictError(`User with email: ${user.email} already exists`);
      }
  
      const password = await bcrypt.hash(user.password, 10);
      user.password = password;
      UserModel.createUser(user);
    }catch(error){

      throw new InternalServerError("Error creating user");
    }

}

export function getUserbyEmail(email: string) {
  try{

    const data = UserModel.getUserbyEmail(email);
    return data;
  }catch(error){
    throw new InternalServerError("Error fetching user by email");
  }
}
