import express from "express";
import { FetchByID, bookApi } from "../controller/BooksController.js";

const booksRoute = express.Router();

booksRoute.get("/all", bookApi);

booksRoute.get("/all/:id", FetchByID);

export default booksRoute;
