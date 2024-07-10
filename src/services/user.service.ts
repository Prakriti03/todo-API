import { error } from "console";
import * as UserModel from "../model/user.model"
import {User } from "../interfaces/user";
import bcrypt from "bcrypt";
import { users } from "../model/user.model";

export function getUserbyId(id:string){
    const data = UserModel.getUserbyId(id);

    if(!data){
        return{
            error : `User with id : ${id} not found`
        };
    }
    return data;
}

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

