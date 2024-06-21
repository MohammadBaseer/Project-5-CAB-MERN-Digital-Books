import express from "express";
import { insertBookDetails } from "../controller/BookDetailController.js";

const bookDetailRoute = express.Router();

bookDetailRoute.post("/book/detail", insertBookDetails);

export { bookDetailRoute };
