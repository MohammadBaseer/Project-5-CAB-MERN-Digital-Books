import express from "express";
import { deleteComments, fetchComments, insertComments, updateComments } from "../controller/CommentsController.js";

const CommentRoute = express.Router();

//! Insert comment Route API
CommentRoute.post("/comments", insertComments);

//! Insert comment Route API
CommentRoute.get("/comments", fetchComments);

//! Insert comment Route API
CommentRoute.delete("/comments/:id", deleteComments);

//! Insert comment Route API
CommentRoute.put("/comments/:id", updateComments);

export { CommentRoute };
