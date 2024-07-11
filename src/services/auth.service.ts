import bcrypt from "bcrypt";
import { User } from "../interfaces/user";
import { sign, JwtPayload, Secret, verify } from "jsonwebtoken";
import config from "../config";
import { getUserbyEmail } from "./user.service";
import { UnauthenticatedError } from "../errors/unauthenticatedError";
import { BadRequestError } from "../errors/badRequestError";

export async function login(body: Pick<User, "email" | "password">) {
  const existingUser = getUserbyEmail(body.email);

  if (!existingUser) {
    throw new UnauthenticatedError("User is not created");
  }

  const isValidPassword = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isValidPassword) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
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
    throw new BadRequestError("Refresh token is required");
  }

  let payload: JwtPayload;
  try {
    payload = verify(oldRefreshToken, config.jwt.secret!) as JwtPayload;
  } catch (error) {
    throw new UnauthenticatedError("Invalid refresh token");
  }

  if (!(payload && payload.id && payload.email && payload.name)) {
    throw new UnauthenticatedError("Invalid refresh token");
  }

  const newPayload: Pick<User, "id" | "name" | "email" | "role"> = {
    id: payload.id,
    name: payload.name,
    email: payload.email,
    role : payload.role,
  };

  const accessToken = sign(newPayload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpiryMS,
  });

  return {
    accessToken,
  };
}
