import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: false},
    dob: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    avatar: { type: String, default: "avatar.jpg" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("user", UserSchema);
export default UserModel;
