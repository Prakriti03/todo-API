import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export async function login(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.login(body);

  res.json(data);
}

export function refresh(req: Request, res: Response) {
  const {refreshToken} = req.body;

  if(!refreshToken){
    return;
  }

  const tokens =  AuthService.refreshToken(refreshToken);

  if (!tokens) {
    return ;
   }
  
  res.json(tokens);
}
