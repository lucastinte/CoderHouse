import User from "../dao/classes/userDao.js";
const userSevice = new User();
export const getUsers = async (req, res) => {
  try {
    const users = await userSevice.getUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("Error al consultar users:", e);
  }
};
export const findUsers = async (req, res) => {
  try {
    const users = await userSevice.findUsers();
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("Error al consultar users:", e);
  }
};
