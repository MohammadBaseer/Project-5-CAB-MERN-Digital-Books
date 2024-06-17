import BookModel from "../models/booksModel.js";
import BooksDetailsModel from "../models/booksDetailsModel.js";

//! display All Book Data API Endpoint
const DisplayBook = async (req, res) => {
  try {
    const allBooks = await BookModel.find().populate("detail");
    res.status(200).json({
      allBooks,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

//! Display by ID API Endpoint
const DisplayBookById = async (req, res) => {
  const fetchByIdPrams = req.params.id;
  console.log("fetchByIdPrams", fetchByIdPrams);
  try {
    const allBooks = await BookModel.findById({ _id: fetchByIdPrams }).populate("detail");

    res.status(201).json(allBooks);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

//! Display by ID and update API Endpoint

const BookUpdate = async (req, res) => {
  const result = req.body;
  console.log("result ==>", result);

  try {
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export { DisplayBookById, DisplayBook, BookUpdate };
