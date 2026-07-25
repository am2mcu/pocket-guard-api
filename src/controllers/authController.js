import env from "../config/env.js";
import * as authService from "../services/authService.js";
import asyncHandler from "express-async-handler";

const sendAsCookie = (res, token) => {
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 1000,
    secure: env.NODE_ENV === "production",
  });
};

export const signup = asyncHandler(async (req, res, next) => {
  const verificationToken = await authService.signup(req.body);

  res.status(200).json({
    status: "success",
    data: {
      message:
        env.NODE_ENV === "development"
          ? `Token: ${verificationToken}`
          : "A verification link has been sent to your email",
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const token = await authService.login(req.body);

  sendAsCookie(res, token);
  res.status(200).json({ status: "success", data: { token } });
});
