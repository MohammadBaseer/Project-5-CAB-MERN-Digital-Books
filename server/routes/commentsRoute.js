import express from "express";
import insertComments from "../controller/CommentsController.js";

const CommentRoute = express.Router();

//! Insert comment Route API
CommentRoute.post("/comments", insertComments);

export { CommentRoute };
