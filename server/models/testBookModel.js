import mongoose from "mongoose";

const { Schema } = mongoose;

const TestBookSchema = new Schema({
  title: { type: String, required: true },
  bookDetail: { type: mongoose.Schema.ObjectId, ref: "testbookdetail" },
});

const TestBookModel = mongoose.model("testbook", TestBookSchema);

export default TestBookModel;
