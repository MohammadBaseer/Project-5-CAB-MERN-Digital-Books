import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, require: true, unique: false },
  description: { type: String, require: true, unique: false },
  price: { type: Number, require: true, unique: false },
  imageurl: { type: String, require: true, unique: false },
  category: { type: String, require: true, unique: false },
});

const ProductsModel = mongoose.model("product", ProductSchema);
export default ProductsModel;
