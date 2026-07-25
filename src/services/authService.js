import User from "../models/userModel.js";
import cryptography from "../utils/cryptoHandler.js";

export const signup = async (data) => {
  const { email, password } = data || {};
  if (!email || !password) throw new BadRequest();

  const user = await User.create({
    email: data.email,
    password: data.password,
  });

  const jwtToken = await user.createAuthToken();
  return jwtToken;
};

export const login = async (data) => {
  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user || !(await user.comparePassword(data.password)))
    throw new Error("Email or password is not valid");

  const token = await user.createAuthToken();
  return token;
};
