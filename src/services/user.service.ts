import { error } from "console";
import * as UserModel from "../model/user.model"
import {User } from "../interfaces/user";
import bcrypt from "bcrypt";

export function getUserbyId(id:string){
    const data = UserModel.getUserbyId(id);

    if(!data){
        return{
            error : `User with id : ${id} not found`
        };
    }
    return data;
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
export async function createUser(user:User){
    
    if(!(user.email && user.password && user.name)){
        return;
    }

    if(UserModel.getUserbyEmail(user.email)){
        return;
    }

    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
    UserModel.createUser(user);
}


export function getUserbyEmail(email:string){
    const data = UserModel.getUserbyEmail(email);
    return data;
}

