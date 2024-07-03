import BookModel from "../models/booksModel.js";
import { removeTempFile } from "../utils/tempFileManagement.js";
import { imageUpload, removeImage } from "../utils/imageManagement.js";
import BooksDetailsModel from "../models/booksDetailsModel.js";
import CommentModel from "../models/commentsModel.js";

//! display All Book Data API Endpoint
const displayBook = async (req, res) => {
  try {
    // const allBooks = await BookModel.find().populate("detail").populate("comment");
    const allBooks = await BookModel.find()
      .populate("detail")
      .populate({ path: "comment", populate: { path: "users", select: ["name", "avatar"] } })
      .sort({ createdAt: -1 });

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
        title: req.body.title.trim(),
        image: imageUrl,
        authors: req.body.authors.split(","),
        userRef: req.body.userRef,
      });
      await insertNewData.save();
      res.status(200).json({ error: "New book inserted" });
    }
  } catch (error) {
    res.status(400).json({ error: error });
    console.log("error==== >", error);
  } finally {
    removeTempFile(req.file);
  }
};

//! Display by ID and update API Endpoint

const bookUpdate = async (req, res) => {
  const bookId = req.query.id;
  const imageUrl = req.query.imageUrl;

  console.log("id", bookId);
  console.log("imageUrl", imageUrl);
  try {
    const updateFields = {};

    const bookExist = await BookModel.findById({ _id: bookId });
    if (!bookExist) {
      res.status(200).json({ error: "Book Not Found" });
      return;
    }
    if (req.body.title) {
      updateFields.title = req.body.title.trim();
    }
    if (req.body.description) {
      updateFields.description = req.body.description;
    }
    if (req.body.authors) {
      updateFields.authors = req.body.authors.split(",");
    }
    if (req.file) {
      const imageUploadToCloud = await imageUpload(req.file, "books_images");
      updateFields.image = imageUploadToCloud;

      removeImage("books_images", imageUrl);
    }
    if (req.body.longDescription) {
      updateFields.longDescription = req.body.longDescription.trim();
    }
    if (req.body.categories) {
      updateFields.categories = req.body.categories.split(",");
    }
    if (req.body.publishAt) {
      updateFields.publishAt = req.body.publishAt;
    }

    const result = await BookModel.findByIdAndUpdate(bookId, updateFields, { new: true });
    const result1 = await BooksDetailsModel.findOneAndUpdate({ bookref: bookId }, updateFields, { new: true });
    res.status(200).json({ error: "Book updated" });
  } catch (error) {
    res.status(400).json({ error: error });
  } finally {
    if (req.file) {
      removeTempFile(req.file);
    }
  }
};

//! Display by ID API Endpoint
const deleteBook = async (req, res) => {
  const book_id = req.query.id;
  const imageUrl = req.query.imageUrl;

  try {
    const deleteBook = await BookModel.findByIdAndDelete({ _id: book_id });
    const deleteBookDetails = await BooksDetailsModel.deleteMany({ bookref: book_id });
    const deleteComments = await CommentModel.deleteMany({ bookRef: book_id });
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
