import colors from "colors";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { imageUpload } from "../utils/imageManagement.js";
import { removeTempFile } from "../utils/tempFileManagement.js";
import { encryptPassword } from "../utils/Bcrypt/PasswordService.js";

const RegisterUser = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    removeTempFile(req.file);
    res.status(400).json({ error: "Credentials missing" });
    return;
  }
  try {
    const existUser = await UserModel.findOne({ email: req.body.email });
    if (existUser) {
      removeTempFile(req.file);
      res.status(400).json({ error: "user already exists" });
      return;
    }
    if (!existUser) {
      const encryptedPassword = await encryptPassword(req.body.password);
      if (!encryptedPassword) {
        console.log("error encrypting password");

        res.status(400).json({ error: "Password encrypt error" });
        return;
      }
      if (encryptedPassword) {
        const newUser = new UserModel({
          email: req.body.email,
          password: encryptedPassword,
          name: req.body.name,
        });

        if (!req.file) {
          return res.status(400).json({ error: "Please select an image" });
        }
        if (req.file) {
          const avatarURL = await imageUpload(req.file, "users_avatar");
          newUser.avatar = avatarURL;
        }
        await newUser.save();
        const userForFront = {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          avatar: newUser.avatar,
        };
        res.status(200).json({ message: "New user created", userForFront });
      }
    }
  } catch (error) {
    res.status(400).json({ error: error });
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
