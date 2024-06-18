import BookModel from "../models/booksModel.js";
import BooksDetailsModel from "../models/booksDetailsModel.js";
import { removeTempFile } from "../utils/tempFileManagement.js";
import { imageUpload } from "../utils/imageManagement.js";

//! display All Book Data API Endpoint
const displayBook = async (req, res) => {
  try {
    const allBooks = await BookModel.find().populate("detail");
    res.status(200).json({
      allBooks,
    });
  } catch (message) {
    console.log("message", message);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

//! Display by ID API Endpoint
const displayBookById = async (req, res) => {
  const fetchByIdPrams = req.params.id;
  console.log("fetchByIdPrams", fetchByIdPrams);
  try {
    const allBooks = await BookModel.findById({ _id: fetchByIdPrams }).populate("detail");
    res.status(201).json(allBooks);
  } catch (message) {
    console.log("message", message);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

//! Insert Data  API Endpoint

const bookInsert = async (req, res) => {
  if (!req.body.title || !req.body.authors) {
    return res.status(400).json({ message: "inputs missing" });
    removeTempFile(req.file);
  }
  try {
    //1. store the image in Cloudinary
    let imageUrl = req.body.image;
    if (!req.file) {
      return res.status(400).json({ message: "Image is missing" });
    } else {
      let imageUrl = await imageUpload(req.file, "books_images");

      //2. create a new object (new BookModel) with the title from the body and url from cloudinary
      const insertNewData = new BookModel({
        title: req.body.title,
        image: imageUrl,
        authors: req.body.authors.split(","),
      });

      //3. save that object to the database
      await insertNewData.save();

      //4. send response with confirmation to the client
      res.status(200).json({ message: "New book inserted", test: insertNewData });
    }
  } catch (message) {
    res.status(400).json({ message: message });
  } finally {
    removeTempFile(req.file);
  }
};

//! Display by ID and update API Endpoint

const bookUpdate = async (req, res) => {
  const result = req.body;
  console.log("result ==>", req.params);

  try {
    res.status(200).json({ result });
  } catch (message) {
    res.status(400).json({ message: message });
  }
};

export { displayBookById, displayBook, bookInsert, bookUpdate };
