import express from "express";
import { deleteComments, insertComments } from "../controller/CommentsController.js";

const CommentRoute = express.Router();

//! Insert comment Route API
CommentRoute.post("/comments", insertComments);

//! Insert comment Route API
CommentRoute.get("/comments/:id", deleteComments);

export { CommentRoute };
