import bcrypt from "bcrypt";
import { User } from "../interfaces/user";
import { sign, JwtPayload, Secret, verify } from "jsonwebtoken";
import config from "../config";
import { getUserbyEmail } from "./user.service";


export async function login(body: Pick<User, "email" | "password">) {
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
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpiryMS,
  });

  return {
    accessToken,
    refreshToken,
  };
}


export function refreshToken(oldRefreshToken: string) {
  if (!oldRefreshToken) {
    return {
      error: "Refresh token is required",
    };
  }

  const payload = verify(oldRefreshToken, config.jwt.secret!) as JwtPayload;

  if (!payload || !payload.id || !payload.email || !payload.name) {
    return { error: "Invalid refresh token" };
  }

  const newPayload: Pick<User, "id" | "name" | "email"> = {
    id: payload.id,
    name: payload.name,
    email: payload.email,
  };

  const accessToken = sign(newPayload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  return {
    accessToken,
  };
}
