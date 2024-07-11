import { NextFunction, Request, Response } from "express";
import * as UserService from "../services/user.service";
import { StatusCodes } from "http-status-codes";
// import loggerWithNameSpace from "../logger"

// const logger = loggerWithNameSpace("UserController");

export async function createUser(req:Request, res : Response, next: NextFunction){
    const {body} = req;
    try {
        await UserService.createUser(body);
        res.status(StatusCodes.CREATED).json(body);
    } catch (error) {
        next(error);
    }
}

export function getUsers(
    req: Request ,
    res: Response, next : NextFunction
  ) {
    try{

        const data = UserService.getUsers();
        res.status(StatusCodes.OK).json(data);
    }catch(error){
        next(error);
    }
}

export function getUserbyId(req: Request, res: Response, next : NextFunction) {
    const { id } = req.params;
  
    // logger.info("called getUserbyId");
  
    try{

        const data = UserService.getUserbyId(id);
        if (data) {
            res.status(StatusCodes.OK).json(data);
        } else {
            res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" });
        }
    }catch(error){
        // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Error fetching user" });
        next(error);
    }

}

