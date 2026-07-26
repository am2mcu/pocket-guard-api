import User from "../models/userModel.js";

export const getMe = async (id) => await User.findById(id);
