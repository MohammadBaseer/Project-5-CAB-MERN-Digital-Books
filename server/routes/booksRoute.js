import express from "express";
import BookModel from "../models/booksModel.js";

const booksRoute = express.Router();

booksRoute.get("/all", async (req, res) => {
  try {
    const allBooks = await BookModel.find({});

    res.status(200).json({
      allBooks,
    });
    // console.log("This Console Message".bgGreen, allBooks);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
});

export default booksRoute;
