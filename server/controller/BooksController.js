import BookModel from "../models/booksModel.js";
import BooksDetailsModel from "../models/booksDetailsModel.js";
import { removeTempFile } from "../utils/tempFileManagement.js";
import { imageUpload } from "../utils/imageManagement.js";

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

//! Insert Data  API Endpoint

const BookInsert = async (req, res) => {
  console.log("======>", "title:==>", req.body.title, "image:===", req.file.image);
  if (!req.body.title) {
    return res.status(400).json({ error: "inputs missing" });
    removeTempFile(req.file);
  }
  try {
    const insertNewData = new BookModel(req.body);
    if (req.file) {
      const insertImageURL = await imageUpload(req.file, "books_images");
      insertNewData.image = insertImageURL;
    }
    await insertNewData.save();
    const bookForFront = new BookModel({
      title: insertNewData.title,
      image: insertNewData.image,
      // author: insertNewData.author,
    });
    res.status(200).json({ result: bookForFront });
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    removeTempFile(req.file);
  }
};

//! Display by ID and update API Endpoint

const BookUpdate = async (req, res) => {
  const result = req.body;
  console.log("result ==>", req.params);

  try {
    res.status(200).json({ result });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

export { DisplayBookById, DisplayBook, BookInsert, BookUpdate };
