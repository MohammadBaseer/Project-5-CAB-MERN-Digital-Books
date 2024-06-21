import BooksDetailsModel from "../models/booksDetailsModel.js";

const insertBookDetails = async (req, res) => {
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
      longDescription: req.body.longDescription,
      categories: req.body.categories.split(","),
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

export { insertBookDetails };
