import express from "express";
import { displayBook, displayBookById, bookUpdate, bookInsert, deleteBook } from "../controller/BooksController.js";
import { multerUpload } from "../middleware/multer.js";
// import BooksDetailsModel from "../models/booksDetailsModel.js";
// import BookModel from "../models/booksModel.js";

const booksRoute = express.Router();

//! display All Book Data API Endpoint
booksRoute.get("/books", displayBook);

//! Display by ID (Details) API Endpoint
booksRoute.get("/books/:id", displayBookById);

//! Post Data API Endpoint
booksRoute.post("/books", multerUpload.single("image"), bookInsert);

//! Display by ID and update API Endpoint
booksRoute.put("/books/:id", bookUpdate);

//! Delete by ID  API Endpoint
booksRoute.delete("/books/:id", deleteBook);


export default booksRoute;
