import { Request, Response } from "express";
import * as UserService from "../services/user.service"

export function createUser(req:Request, res : Response){
    const {body} = req;
    UserService.createUser(body);
    res.json(body);
}

