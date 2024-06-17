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

    const newUser = new UserModel(req.body);
    if (req.file) {
      const avatarURL = await imageUpload(req.file, "users_avatar");
      newUser.avatar = avatarURL;
    }

    await newUser.save();

    const sPassword = await SecurePassword(req.body.password);
    const userForFront = new UserModel({
      name: newUser.name,
      email: newUser.email,
      password: sPassword,
      avatar: newUser.avatar,
    });

    // res.status(200).send({ Result: newUser });
    res.status(200).send({ Result: userForFront });
  } catch (error) {
    res.status(400).send(error);
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
    res.status(200).json({
      error: error.message,
      code: error.code,
    });
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
    res.status(400).json(error.message);
  }
};

export { RegisterUser, UsersAllData, UserLogin };
