import asyncHandler from "express-async-handler";
import { promisify } from "util";
import User from "../models/userModel.js";
import env from "../config/env.js";
import { verifyAuthToken } from "../utils/jwtHandler.js";

const extractTokenHeader = (header) => {
  const authHeader = header.split(" ");
  if (authHeader[0] !== "Bearer" || !authHeader[1])
    throw new Error("Invalid authorization header");

  return authHeader[1];
};

const extractToken = (req) => {
  if (req.headers.authorization)
    return extractTokenHeader(req.headers.authorization);

  if (req.cookies.jwt) return req.cookies.jwt;

  return;
};

export const authenticate = asyncHandler(async (req, res, next) => {
  const token = extractToken(req);
  if (!token) throw new Error("Token is missing");

  const { id, iat } = await verifyAuthToken(token);

  const user = await User.findById(id).select("+passwordChangedAt");
  if (!user) throw new Error("User no longer exists");

  req.user = user;
  next();
});

export const authorize = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    if (!req.user) throw new Error();

    if (!roles.includes(req.user.role))
      throw new Error("Not allowed to access this resource");

    next();
  });
};
