import BookModel from "../models/booksModel.js";
import BooksDetailsModel from "../models/booksDetailsModel.js";

const bookApi = async (req, res) => {
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

const FetchByID = async (req, res) => {
  const fetchByIdPrams = req.params.id;
  console.log("fetchByIdPrams", fetchByIdPrams);
  try {
    const allBooks = await BookModel.findById({ _id: fetchByIdPrams }).populate("detail");

    res.status(201).send(allBooks);
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};

export { bookApi, FetchByID };
