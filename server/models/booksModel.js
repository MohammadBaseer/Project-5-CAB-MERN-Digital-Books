import mongoose from "mongoose";

const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    authors: { type: [String], required: true },
    userRef: { type: mongoose.Schema.ObjectId, required: false },
    likes: [{ type: String }],
    // likes: [{ type: mongoose.Types.ObjectId }],
    // likes: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

BookSchema.virtual("detail", {
  ref: "booksdetail",
  localField: "_id",
  foreignField: "bookref",
  justOne: true,
});

BookSchema.virtual("comment", {
  ref: "comment",
  localField: "_id",
  foreignField: "bookRef",
  justOne: false,
});

BookSchema.set("toObject", { virtuals: true });
BookSchema.set("toJSON", { virtuals: true });

const BookModel = mongoose.model("book", BookSchema);

export default BookModel;
