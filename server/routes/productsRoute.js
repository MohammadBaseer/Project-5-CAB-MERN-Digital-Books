import express from "express";
import { products, productsByCategory } from "../controller/ProductsController.js";

const productsRouter = express.Router();

productsRouter.get("/all", products);
productsRouter.get("/:category", productsByCategory);

export default productsRouter;
