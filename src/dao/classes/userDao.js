import { userModel } from "../models/user.js";
export default class User {
  getUsers = async () => {
    try {
      const users = await userModel.find();
      return users;
    } catch (e) {
      throw new Error(`Error interno: ${e.message}`);
    }
  };
  findUsers = async (username) => {
    try {
      const findUser = await userModel.findOne({ email: username }).lean();
      return findUser;
    } catch (e) {
      throw new Error(`Error interno: ${e.message}`);
    }
  };
}
