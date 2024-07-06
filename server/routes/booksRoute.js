import express from "express";
import { displayBook, displayBookById, bookUpdate, bookInsert, deleteBook, like } from "../controller/BooksController.js";
import { multerUpload } from "../middleware/multer.js";
import JWTAuth from "../middleware/JSTAuth.js";
// import BooksDetailsModel from "../models/booksDetailsModel.js";
// import BookModel from "../models/booksModel.js";

const booksRoute = express.Router();

//! display All Book Data API Endpoint
booksRoute.get("/books", displayBook);

//! Display by ID (Details) API Endpoint
booksRoute.get("/books/:id", displayBookById);

//! Post Data API Endpoint
// booksRoute.post("/books", multerUpload.single("image"), bookInsert);
booksRoute.post("/books", JWTAuth, multerUpload.single("image"), bookInsert);

//! Display by ID and update API Endpoint
booksRoute.put("/books/", multerUpload.single("image"), bookUpdate);

//! Delete by ID  API Endpoint
// booksRoute.delete("/books/:id", deleteBook);
booksRoute.delete("/books/", deleteBook);

//! Like
booksRoute.put("/likes/", JWTAuth, like);
// booksRoute.put("/likes/", like);

export default booksRoute;
