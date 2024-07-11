import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";

import loggerWithNameSpace from "../logger";

const logger = loggerWithNameSpace("RequestLogger");

export function requestLogger(req:Request, res:Response, next:NextFunction){
    logger.info(`${req.method} : ${req.url}`);
    
    next();

}