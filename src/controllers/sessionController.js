import User from "../dao/classes/userDao.js";
const userSevice = new User();
export const findUsers = async (req, res) => {
  try {
    const findUser = await userModel.findOne({ email: username }).lean();
    return findUser;
  } catch (e) {
    res.status(500).send("Error al consultar users:", e);
  }
};
