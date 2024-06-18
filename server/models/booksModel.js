import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    authors: { type: [String], required: true },
    detail: { type: mongoose.Schema.ObjectId, ref: "booksdetail" },
  },
  { timestamps: true }
);

const BookModel = mongoose.model("book", BookSchema);

export default BookModel;
