import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema({
  title: { type: String, required: true, unique: false },
  description: { type: String, required: true, unique: false },
  price: { type: Number, required: true, unique: false },
  imageurl: { type: String, required: true, unique: false },
  category: { type: String, required: true, unique: false },
});

const ProductsModel = mongoose.model("product", ProductSchema);
export default ProductsModel;
