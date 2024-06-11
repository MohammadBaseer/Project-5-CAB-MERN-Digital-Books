import mongoose from "mongoose";
const { Schema } = mongoose;

const TestSchema = new Schema({
  test1: { type: String, required: true },
  test2: { type: String },
});

const TestModel = mongoose.model("Test", TestSchema);

export default TestModel;
