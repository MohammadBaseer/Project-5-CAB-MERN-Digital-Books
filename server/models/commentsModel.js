import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    comment: { type: String, required: true },
    bookRef: { type: Schema.Types.ObjectId, ref: "book" },
    userRef: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comment", CommentSchema);

export default CommentModel;
