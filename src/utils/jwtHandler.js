import jwt from "jsonwebtoken";
import { promisify } from "util";
import { env } from "../config/env.js";

export const verifyAuthToken = async (token) => {
  return await promisify(jwt.verify)(token, env.JWT_SECRET);
};

export const createAuthToken = async (payload) => {
  return await promisify(jwt.sign)(payload, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRY,
  });
};
