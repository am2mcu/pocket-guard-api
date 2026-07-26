import expressAsyncHandler from "express-async-handler";
import * as userService from "../services/userService.js";

export const getMe = expressAsyncHandler(async (req, res, next) => {
  const user = await userService.getMe(req.user.id);

  res.status(200).json({ status: "success", data: { user } });
});
