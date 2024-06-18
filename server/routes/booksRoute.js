import express from "express";
import { DisplayBook, DisplayBookById, BookUpdate, BookInsert } from "../controller/BooksController.js";
import { multerUpload } from "../middleware/multer.js";
// import BooksDetailsModel from "../models/booksDetailsModel.js";
// import BookModel from "../models/booksModel.js";

const booksRoute = express.Router();

//! display All Book Data API Endpoint
booksRoute.get("/all", DisplayBook);

//! Display by ID (Details) API Endpoint
booksRoute.get("/all/:id", DisplayBookById);

//! Post Data API Endpoint
booksRoute.post("/post", multerUpload.single("image"), BookInsert);

//! Display by ID and update API Endpoint
booksRoute.post("/update", BookUpdate);

export default booksRoute;
