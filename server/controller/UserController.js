import colors from "colors";
import UserModel from "../models/userModel.js";
import { SecurePassword } from "../utils/Bcrypt/PasswordHash.js";

const RegisterUser = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  try {
    const photoPath = req.file.path;
    const sPassword = await SecurePassword(req.body.password);
    const user = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: sPassword,
      avatar: photoPath,
    });
    const userData = await UserModel.findOne({ email: req.body.email });
    if (userData) {
      return res.status(200).send({ error: "user already exists" });
    } else {
      const InsertUser = await user.save();
      res.status(200).send({ Result: InsertUser });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

const UserFetchData = async (req, res) => {
  try {
    const userData = await UserModel.find({}, "name email avatar createdAt");
    res.status(200).json(userData);
  } catch (error) {
    res.status(200).send({
      error: error.message,
      code: error.code,
    });
  }
};

export { RegisterUser, UserFetchData };
