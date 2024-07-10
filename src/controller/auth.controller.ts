import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";

export async function login(req: Request, res: Response) {
  const { body } = req;
  const data = await AuthService.login(body);

  res.json(data);
}

/**
 * The function `refresh` takes a refresh token from the request body, uses it to generate new tokens
 * using `AuthService.refreshToken`, and returns the new tokens in the response.
 * @param {Request} req - Request object containing the request details sent to the server.
 * @param {Response} res - The `res` parameter in the `refresh` function is an object representing the
 * HTTP response that the server sends back to the client. It allows you to send data, set cookies, and
 * control other aspects of the response that the client will receive.
 * @returns If the `refreshToken` is missing from the request body or if the `AuthService.refreshToken`
 * function does not return any tokens, then the function will return without sending any response. If
 * tokens are successfully retrieved from the `AuthService.refreshToken` function, then the tokens will
 * be sent as a JSON response using `res.json(tokens)`.
 */
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
