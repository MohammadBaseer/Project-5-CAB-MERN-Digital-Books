import BookModel from "../models/booksModel.js";
import { removeTempFile } from "../utils/tempFileManagement.js";
import { imageUpload, removeImage } from "../utils/imageManagement.js";
// import CommentModel from "../models/commentsModel.js";
import BooksDetailsModel from "../models/booksDetailsModel.js";

//! display All Book Data API Endpoint
const displayBook = async (req, res) => {
  try {
    // const allBooks = await BookModel.find().populate("detail").populate("comment");
    const allBooks = await BookModel.find()
      .populate("detail")
      .populate({ path: "comment", populate: { path: "users", select: ["name", "avatar"] } });

    res.status(200).json(allBooks);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      error: "Something went wrong",
    });
  }
};

//! Display by ID API Endpoint
const displayBookById = async (req, res) => {
  const fetchByIdPrams = req.params.id;
  console.log("fetchByIdPrams", fetchByIdPrams);
  try {
    const allBooks = await BookModel.findById({ _id: fetchByIdPrams })
      .populate("detail")
      .populate({ path: "comment", select: ["_id", "comment", "bookRef", "userRef"], populate: { path: "users", select: ["name", "avatar"] } });
    res.status(200).json(allBooks);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      error: "Something went wrong",
    });
  }
};

//! Insert Data  API Endpoint
const bookInsert = async (req, res) => {
  console.log("req.file", req.file);
  if (!req.body.title || !req.body.authors) {
    removeTempFile(req.file);
    return res.status(400).json({ error: "inputs missing" });
  }
  try {
    let imageUrl = req.body.image;
    if (!req.file) {
      return res.status(400).json({ error: "Image is missing" });
    } else {
      let imageUrl = await imageUpload(req.file, "books_images");
      const insertNewData = new BookModel({
        title: req.body.title,
        image: imageUrl,
        authors: req.body.authors.split(","),
      });
      await insertNewData.save();
      res.status(200).json({ error: "New book inserted" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
  } finally {
    removeTempFile(req.file);
  }
};

//! Display by ID and update API Endpoint
//REVIEW -  //! Should Add the image update Fun
const bookUpdate = async (req, res) => {
  const bookId = req.params.id;
  if (!req.body.title || !req.body.authors) {
    return res.status(400).json({ error: "inputs missing" });
    removeTempFile(req.file);
  }
  try {
    const authors = req.body.authors.split(",");
    const doc = {
      title: req.body.title,
      image: req.body.image,
      authors: authors,
    };
    const result = await BookModel.findByIdAndUpdate({ _id: bookId }, doc, { new: true });
    res.status(200).json({ error: "Update successful" });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

//! Display by ID API Endpoint
const deleteBook = async (req, res) => {
  const book_id = req.query.id;
  const imageUrl = req.query.imageUrl;

  try {
    const deleteBook = await BookModel.findByIdAndDelete({ _id: book_id });
    const deleteBookDetails = await BooksDetailsModel.deleteMany({ bookref: book_id });
    // const deleteComments = await CommentModel.deleteMany({ bookRef: book_id });
    removeImage("books_images", imageUrl);

    res.status(200).json({ error: "Book deleted" });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      error: error,
    });
  }
};

export { displayBookById, displayBook, bookInsert, bookUpdate, deleteBook };
