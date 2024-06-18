import colors from "colors";
import UserModel from "../models/userModel.js";
import { SecurePassword } from "../utils/Bcrypt/PasswordHash.js";
import bcrypt from "bcrypt";
import { imageUpload } from "../utils/imageManagement.js";
import { removeTempFile } from "../utils/tempFileManagement.js";

const RegisterUser = async (req, res) => {
  // console.log("File =============>>>>>>>>>", req.file);
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ error: "Credentials missing" });
    removeTempFile(req.file);
  }
  //1. check if user exists?
  //if it exists, just send response to client

  //2. User do not exist?
  //a) store image
  //b)create new user object with the model
  //c)send response to client.
  try {
    const existUser = await UserModel.findOne({ email: req.body.email });
    if (existUser) {
      removeTempFile(req.file);
      return res.status(400).send({ error: "user already exists" });
    }

    if (!req.file) {
      return res.status(400).send({ error: "Please select an image" });
    } else {
      const avatarURL = await imageUpload(req.file, "users_avatar");

      const sPassword = await SecurePassword(req.body.password);
      const newUser = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: sPassword,
        avatar: avatarURL,
      });
      await newUser.save();

      res.status(200).send({ message: "New user created" });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  } finally {
    removeTempFile(req.file);
  }
};

//! user All data API
const UsersAllData = async (req, res) => {
  try {
    const userData = await UserModel.find({}, "name email avatar createdAt");
    res.status(200).json(userData);
  } catch (error) {
    res.status(200).json({ error: error });
  }
};

//! User Login
const UserLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userData = await UserModel.findOne({ email: email });
    console.log("userData", userData);
    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password);
      if (passwordMatch) {
        res.status(200).json({ Success: "User Found" });
      } else {
        res.status(200).json({ error: "User Login failed" });
      }
    } else {
      res.status(200).json({ error: "User Login failed" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export { RegisterUser, UsersAllData, UserLogin };
