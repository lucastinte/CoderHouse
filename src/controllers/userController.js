import { userModel } from "../models/user.js";
export const getUsers = async () => {
  const users = await userModel.find();
  return users;
};
