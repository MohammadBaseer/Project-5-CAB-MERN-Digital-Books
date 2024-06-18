// // import productsModel from "../models/productsModel.js";
// import ProductsModel from '../models/ProductsModel.js'; // Adjust the import path as needed
// import ProductDetailsModel from '../models/ProductDetails.js'; // Adjust the import path as needed
import ProductsModel from "../models/productsModel.js"
import ProductDetailsModel from "../models/productDetails.js"




const products = async (req, res) => { 
  
  try {
    const allProducts = await ProductsModel.find().populate('product_id');
    console.log("allProducts", allProducts);

    res.status(200).json({
      number: allProducts.length,
      allProducts,
    });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({
      message: "Something went wrong",
    });
  }
};








const productsByCategory = async (req, res) => {
  // console.log("category".bgGreen, req);
  const category = req.params.category;
  const price = Number(req.query.price);
  //   const price = req.query.price;
  if (price) {
    try {
      const allProducts = await ProductsModel.find({ category: category, price: { $gte: price } }).exec();
      if (allProducts.length === 0) {
        res.status(200).json({
          message: "No Product with this number",
        });
        return;
      }
      res.status(200).json({
        number: allProducts.length,
        allProducts,
      });
    } catch (error) {
      console.log("error", error);
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  }
  if (!price) {
    try {
      const allProducts = await ProductsModel.find({ category: category });
      console.log("allProducts", allProducts);

      res.status(200).json({
        number: allProducts.length,
        allProducts,
      });
    } catch (error) {
      console.log("error", error);
      res.status(400).json({
        message: "Something went wrong",
      });
    }
  }
};

export { products, productsByCategory };
