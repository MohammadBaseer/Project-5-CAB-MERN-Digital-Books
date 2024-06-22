import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    authors: { type: [String], required: true },
  },
  { timestamps: true }
);

BookSchema.virtual("detail", {
  ref: "booksdetail",
  localField: "_id",
  foreignField: "bookref",
  justOne: true, // Use justOne if you expect a one-to-one relationship
});

BookSchema.set("toObject", { virtuals: true });
BookSchema.set("toJSON", { virtuals: true });

const BookModel = mongoose.model("book", BookSchema);

export default BookModel;
