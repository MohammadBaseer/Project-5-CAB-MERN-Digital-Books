import colors from "colors";
import UserModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import { imageUpload, removeImage } from "../utils/imageManagement.js";
import { removeTempFile } from "../utils/tempFileManagement.js";
import { encryptPassword, verifyPassword } from "../utils/Bcrypt/PasswordService.js";
import generateToken from "../utils/tokenServices.js";
import passport from "passport";

const RegisterUser = async (req, res) => {
  const name = req.body.name.trim();
  const email = req.body.email.toLowerCase().trim();
  if (!name || !email || !req.body.password) {
    removeTempFile(req.file);
    res.status(400).json({ error: "Credentials missing" });
    return;
  }
  try {
    const existUser = await UserModel.findOne({ email: email });
    if (existUser) {
      removeTempFile(req.file);
      res.status(400).json({ error: "user already exists" });
      return;
    }
    if (!existUser) {
      const encryptedPassword = await encryptPassword(req.body.password);
      if (!encryptedPassword) {
        res.status(400).json({ error: "Password encrypt error" });
        return;
      }
      if (encryptedPassword) {
        const newUser = new UserModel({
          email: email,
          password: encryptedPassword,
          name: name,
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
    console.log("Err==>", error);
  } finally {
    removeTempFile(req.file);
  }
};

//! user All data API
const UsersAllData = async (req, res) => {
  try {
    const userData = await UserModel.find({}, "name email avatar surname dob address updatedAt");
    res.status(200).json(userData);
  } catch (error) {
    res.status(200).json({ error: error });
  }
};

//! User Login
const UserLogin = async (req, res) => {
  const email = req.body.email.toLowerCase().trim();
  if (!email || !req.body.password) {
    res.status(400).json({ error: "Credentials missing" });
    return;
  }
  try {
    const existingUser = await UserModel.findOne({ email: email });
    if (!existingUser) {
      res.status(400).json({ error: "Email is not registered" });
      return;
    }

    if (existingUser) {
      const isPasswordCorrect = await verifyPassword(req.body.password, existingUser.password);

      if (!isPasswordCorrect) {
        res.status(400).json({ error: "Password doesn't match" });
        return;
      }
      if (isPasswordCorrect) {
        const token = generateToken(existingUser._id);
        if (!token) {
          res.status(400).json({ error: "Something went wrong with token" });
          return;
        }
        if (token) {
          res.status(200).json({
            Success: "Login Successful",
            user: {
              id: existingUser._id,
              name: existingUser.name,
              email: existingUser.email,
              avatar: existingUser.avatar,
              //!
              surname: existingUser.surname,
              dob: existingUser.dob,
              address: existingUser.address,
            },
            token: token,
          });
        }
      }
    }
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//! USer Update
const userUpdate = async (req, res) => {
  const uid = req.user._id;
  const imageUrl = req.user.avatar;

  console.log(imageUrl);

  if (!req.body) {
    return res.status(400).json({ error: "inputs missing" });
  }
  try {
    const updateFields = {};

    if (req.body.name) {
      updateFields.name = req.body.name.trim();
    }
    if (req.body.surname) {
      updateFields.surname = req.body.surname.trim();
    }
    if (req.body.dob) {
      updateFields.dob = req.body.dob;
    }
    // if (req.body.email) {
    //   updateFields.email = req.body.email..trim();
    // }
    if (req.body.address) {
      updateFields.address = req.body.address.trim();
    }
    if (req.body.passport) {
      const encryptedPassword = await encryptPassword(req.body.password);
      updateFields.passport = encryptedPassword;
    }
    if (req.file) {
      console.log("====> file <====");
      const imageUploadToCloudUrl = await imageUpload(req.file, "users_avatar");
      updateFields.avatar = imageUploadToCloudUrl;
      removeImage("users_avatar", imageUrl); ///REVIEW -  Provide ImageUrl from user token data
    }

    const result = await UserModel.findByIdAndUpdate({ _id: uid }, updateFields, { new: true });

    res.status(200).json({ error: "Update successful" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//! User Profile
const getUserProfile = async (req, res) => {
  if (req.user) {
    res.status(200).json({
      msg: "User Profile information",
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        //!
        surname: req.user.surname,
        dob: req.user.dob,
        address: req.user.address,
      },
    });
  }
};

export { RegisterUser, UsersAllData, UserLogin, getUserProfile, userUpdate };
