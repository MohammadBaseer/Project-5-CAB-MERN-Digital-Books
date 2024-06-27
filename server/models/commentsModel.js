import mongoose from "mongoose";

const { Schema } = mongoose;

const CommentSchema = new Schema(
  {
    comment: { type: String, required: true },
    bookRef: { type: Schema.Types.ObjectId, ref: "book", required: true },
    userRef: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  { timestamps: true }
);

CommentSchema.virtual("users", {
  ref: "user",
  localField: "userRef",
  foreignField: "_id",
  justOne: false,
});

CommentSchema.set("toObject", { virtuals: true });
CommentSchema.set("toJSON", { virtuals: true });

const CommentModel = mongoose.model("comment", CommentSchema);
// const CommentModel = mongoose.models.CommentSchema || mongoose.model("comment", CommentSchema);

export default CommentModel;
