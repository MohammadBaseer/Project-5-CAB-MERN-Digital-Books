import express from "express";
import multer from "multer";
import { storage } from "../utils/Multer/MulterUploadImage.js";
import { RegisterUser, UserFetchData } from "../controller/UserController.js";
const UserRouter = express.Router();
const upload = multer({ storage });

UserRouter.get("/user", UserFetchData);

UserRouter.post("/user", upload.single("avatar"), RegisterUser);

export default UserRouter;
