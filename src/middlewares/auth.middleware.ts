import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import config from "../config";

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
