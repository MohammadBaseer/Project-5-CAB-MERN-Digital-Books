import mongoose from "mongoose";

const { Schema } = mongoose;

const ContactFormMessagesSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    messages: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactFormMessagesModel = mongoose.model("message", ContactFormMessagesSchema);

export default ContactFormMessagesModel;
