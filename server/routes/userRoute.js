import express from "express";
import { RegisterUser, UserLogin, UsersAllData, getUserProfile, userUpdate } from "../controller/UserController.js";
import { multerUpload } from "../middleware/multer.js";
import JWTAuth from "../middleware/JSTAuth.js";

const UserRouter = express.Router();

// user all data API
UserRouter.get("/user", UsersAllData);

UserRouter.post("/user", multerUpload.single("avatar"), RegisterUser);

//User Login API
UserRouter.post("/login", UserLogin);

//User profile update API
UserRouter.put("/user/:id", userUpdate);

//User profile API
UserRouter.get("/profile", JWTAuth, getUserProfile);

export default UserRouter;
