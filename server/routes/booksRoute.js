import express from "express";
import { displayBook, displayBookById, bookUpdate, bookInsert } from "../controller/BooksController.js";
import { multerUpload } from "../middleware/multer.js";
// import BooksDetailsModel from "../models/booksDetailsModel.js";
// import BookModel from "../models/booksModel.js";

const booksRoute = express.Router();

//! display All Book Data API Endpoint
booksRoute.get("/all", displayBook);

//! Display by ID (Details) API Endpoint
booksRoute.get("/all/:id", displayBookById);

//! Post Data API Endpoint
booksRoute.post("/post", multerUpload.single("image"), bookInsert);

//! Display by ID and update API Endpoint
booksRoute.post("/update", bookUpdate);

export default booksRoute;
