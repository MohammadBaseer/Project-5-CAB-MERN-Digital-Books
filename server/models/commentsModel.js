import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("comment", CommentSchema);

export default CommentModel;
