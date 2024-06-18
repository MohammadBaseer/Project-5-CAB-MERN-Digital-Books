import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductDetailsSchema = new Schema({
  details: { type: String, required: true, unique: false },
  product_id: { type: mongoose.Schema.ObjectId, ref: "product" },

});



const ProductDetailsModel = mongoose.model("productdetail", ProductDetailsSchema);

export default ProductDetailsModel