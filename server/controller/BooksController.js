import BookModel from "../models/booksModel.js";
import { removeTempFile } from "../utils/tempFileManagement.js";
import { imageUpload, removeImage } from "../utils/imageManagement.js";
import CommentModel from "../models/commentsModel.js";
import BooksDetailsModel from "../models/booksDetailsModel.js";

//! display All Book Data API Endpoint
const displayBook = async (req, res) => {
  try {
    const allBooks = await BookModel.find()
      .populate("detail")
      .populate({ path: "comment", populate: { path: "users", select: ["name", "surname", "avatar", "email", "dob", "address", "createdAt"] } })
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
  try {
    const allBooks = await BookModel.findById({ _id: fetchByIdPrams })
      .populate("detail")
      .populate({ path: "comment", select: ["_id", "comment", "bookRef", "userRef"], populate: { path: "users", select: ["name", "surname", "avatar", "email", "dob", "address", "createdAt"] } });

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
  const uid = req.user._id;

  // convert String to Array and clean the spacing
  const authorsStringCleaned = req.body.authors.split(",").map((author) => author.trim());

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

        authors: authorsStringCleaned,

        userRef: uid,
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

const bookUpdate = async (req, res) => {
  const bookId = req.query.id;
  const imageUrl = req.query.imageUrl;

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
      // convert String to Array and clean the spacing
      const authorsStringCleaned = req.body.authors.split(",").map((author) => author.trim());
      updateFields.authors = authorsStringCleaned;
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
      // convert String to Array and clean the spacing
      const categoriesStringCleaned = req.body.categories.split(",").map((category) => category.trim());
      updateFields.categories = categoriesStringCleaned;
    }
    if (req.body.publishAt) {
      updateFields.publishAt = req.body.publishAt;
    }

    await BookModel.findByIdAndUpdate(bookId, updateFields, { new: true });
    await BooksDetailsModel.findOneAndUpdate({ bookref: bookId }, updateFields, { new: true });
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

//! Like
const like = async (req, res) => {
  const bookID = req.body.bookId;

  try {
    const existBook = await BookModel.findById(bookID);
    const result = existBook.likes;
    const isBookLiked = existBook.likes.includes(req.user._id);
    if (!isBookLiked) {
      const like = await BookModel.findByIdAndUpdate(bookID, { $addToSet: { likes: req.user._id } }, { new: true });
      res.status(200).json({ error: "Like" });
    } else {
      const unLike = await BookModel.findByIdAndUpdate(bookID, { $pull: { likes: req.user._id } }, { new: true });
      res.status(200).json({ error: "unlike" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

//! Book Details EndPoint
const insertBookDetails = async (req, res) => {
  // convert String to Array and clean the spacing
  const categoriesStringCleaned = req.body.categories.split(",").map((author) => author.trim());

  if (!req.body.longDescription) {
    return res.status(400).json({ error: "Description input is missing" });
  }
  if (!req.body.categories) {
    return res.status(400).json({ error: "Categories input is missing" });
  }
  if (!req.body.bookref) {
    return res.status(400).json({ error: "Book ID reference is failed" });
  }
  if (!req.body.publishAt) {
    return res.status(400).json({ error: "Book Publish date is missing" });
  }

  try {
    const insertNewDetails = new BooksDetailsModel({
      longDescription: req.body.longDescription.trim(),
      categories: categoriesStringCleaned,
      bookref: req.body.bookref,
      publishAt: req.body.publishAt,
      bookId: req.body.bookId,
    });

    await insertNewDetails.save();

    res.status(200).json({
      error: "Book added successfully",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { displayBookById, displayBook, bookInsert, bookUpdate, deleteBook, like, insertBookDetails };
