import colors from "colors";
import UserModel from "../models/userModel.js";

export const RegisterUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const photoPath = req.file.path;
  const user = new UserModel({
    name,
    email,
    password,
    avatar: photoPath,
  });
  try {
    const InsertUser = await user.save();
    if (InsertUser) {
      res.status(200).send({
        Result: InsertUser,
      });
    }
  } catch (error) {
    res.status(500).send({
      code: error.code,
      message: error.message,
    });
  }
};
