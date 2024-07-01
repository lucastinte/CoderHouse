import { userModel } from "../models/user.js";
export const getUsers = async () => {
  const users = await userModel.find();
  return users;
};
export const sendDocuments = async (req, res) => {
  try {
    const { uid } = req.params;
    const newDocs = req.body;
    const user = await userModel.findByIdAndUpdate(
      uid,
      {
        $push: { documents: { $each: newDocs } },
      },
      { new: true }
    );
    if (!user) {
      res.status(404).send("user no existe");
    } else {
      res.status(200).send(user);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};
