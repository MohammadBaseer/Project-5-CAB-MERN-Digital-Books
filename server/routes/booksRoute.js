import express from "express";
import { DisplayBook, DisplayBookById, BookUpdate } from "../controller/BooksController.js";
// import BooksDetailsModel from "../models/booksDetailsModel.js";
// import BookModel from "../models/booksModel.js";

const booksRoute = express.Router();

//! display All Book Data API Endpoint
booksRoute.get("/all", DisplayBook);

//! Display by ID API Endpoint
booksRoute.get("/all/:id", DisplayBookById);

//! Display by ID and update API Endpoint
booksRoute.post("/update", BookUpdate);

export default booksRoute;
