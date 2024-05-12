import { userModel } from "../models/user.js";
export const findUsers = async (username) => {
  const findUser = await userModel.findOne({ email: username }).lean();
  return findUser;
};
