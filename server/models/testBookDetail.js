import mongoose from "mongoose";

const { Schema } = mongoose;

const TestBookDetailSchema = new Schema({
  Author: { type: String, required: true },
  published: { type: String },
  Details: { type: String },
});

const TestBookDetailModel = mongoose.model("testbookdetail", TestBookDetailSchema);

export default TestBookDetailModel;
