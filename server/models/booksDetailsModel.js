import mongoose from "mongoose";

const { Schema } = mongoose;

const BooksDetailsSchema = new Schema({
  isbn: { type: String, required: true },
  pageCount: { type: Number, required: true },
  date: Date,
  longDescription: { type: String, required: true },
  status: { type: String, required: true },
  categories: { type: [String], required: true },
});

const BooksDetailsModel = mongoose.model("booksdetail", BooksDetailsSchema);

export default BooksDetailsModel;
