import express from "express";
import { RegisterUser, UserLogin, UsersAllData } from "../controller/UserController.js";
import { multerUpload } from "../middleware/multer.js";

// console.log("Type of ------>", multerUpload.single("avatar"));

const UserRouter = express.Router();

// user all data API
UserRouter.get("/user", UsersAllData);

// const test = (req, res) => {
//   console.log("This is the middleware ------>");
// };
//  UserRouter.post("/user", test, RegisterUser);

// user Registration API

UserRouter.post("/user", multerUpload.single("avatar"), RegisterUser);

//User Login API
UserRouter.get("/login", UserLogin);
// UserRouter.post("/login", (req, res) => {
//   res.status(200).send("The End Point is Working");
// });

export default UserRouter;
