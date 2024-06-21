import mongoose from "mongoose";

const { Schema } = mongoose;

const BooksDetailsSchema = new Schema(
  {
    longDescription: { type: String, required: true },
    categories: { type: [String], required: true },
    publishAt: { type: String, required: true },
    bookref: { type: mongoose.Schema.ObjectId, ref: "book"},
  },
  { timestamps: true }
);
const BooksDetailsModel = mongoose.model("booksdetail", BooksDetailsSchema);

export default BooksDetailsModel;
