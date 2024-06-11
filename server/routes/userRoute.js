import express from "express";
import UserModel from "../models/userModel.js";

const UserRouter = express.Router();

UserRouter.get("/user", async (req, res) => {
  //   console.log("req Checking ======>".bgGreen, req);

  try {
    const { name, email, password } = req.body;

    const users = new UserModel({
      name,
      email,
      password,
    });

    const userData = await users.save();

    res.status(200).send({
      msg: "Successfully added",
      data: userData,
    });
  } catch (error) {
    console.log(error);
  }

  //   res.status(200).json({
  //     message: "it working",
  //   });
});

export default UserRouter;
