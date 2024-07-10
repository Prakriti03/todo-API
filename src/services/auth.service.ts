import bcrypt from "bcrypt";
import { User } from "../interfaces/user";
import { sign, JwtPayload, verify } from "jsonwebtoken";
import config from "../config";
import { getUserbyEmail } from "./user.service";

export async function login(body: Pick<User, "email" | "password" >) {
  const existingUser = getUserbyEmail(body.email);

  if (!existingUser) {
    return {
      error: "Invalid",
    };
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );


  if (!isValidPassword) {
    return {
      error: "Invalid password",
    };
  }

  const payload = {
    id : existingUser.id,
    name : existingUser.name,
    email : existingUser.email,
  };

  const accessToken =  sign(payload, config.jwt.secret!, {
    expiresIn : config.jwt.accessTokenExpiryMS,
  });

  const refreshToken =  sign(payload, config.jwt.secret!, {
    expiresIn : config.jwt.refreshTokenExpiryMS,
  });

  return{
    accessToken,
    refreshToken,
  };
}
export const refresh = (oldRefreshToken: string) => {
  if (!oldRefreshToken) {
    return {
      message: 'Invalid refresh token',
    };
  }

  let isValidToken: JwtPayload;
  try {
    isValidToken = verify(oldRefreshToken, config.jwt.secret!) as JwtPayload;
  } catch (error) {
    return {
      message: 'Invalid refresh token',
    };
  }

  const payload = {
    id: isValidToken.id,
    name: isValidToken.name,
    email: isValidToken.email,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: parseInt(config.jwt.accessTokenExpiryMS),
  });

  const newRefreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: parseInt(config.jwt.refreshTokenExpiryMS),
  });

  return {
    accessToken,
    newRefreshToken,
  };
};

