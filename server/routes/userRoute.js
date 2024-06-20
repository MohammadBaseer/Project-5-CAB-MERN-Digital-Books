import express from "express";
import { RegisterUser, UserLogin, UsersAllData } from "../controller/UserController.js";
import { multerUpload } from "../middleware/multer.js";

const UserRouter = express.Router();

// user all data API
UserRouter.get("/user", UsersAllData);

UserRouter.post("/user", multerUpload.single("avatar"), RegisterUser);

//User Login API
UserRouter.post("/login", UserLogin);

export default UserRouter;
