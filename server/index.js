import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import colors from "colors";
import * as dotenv from "dotenv";
import router from "./routes/testRoute.js";
import productsRouter from "./routes/productsRoute.js";

dotenv.config();
const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  app.use(urlencoded({ extended: true }));
  app.use(cors());
};

const startServer = () => {
  const port = process.env.port || 5000;
  app.listen(port, () => {
    console.log("server is running on Por", port);
  });
};

const loadRoots = () => {
  app.use("/api", router);
  app.use("/api/products", productsRouter);
};

const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected".bgBlue);
  } catch (error) {
    console.log("Something went wrong".bgRed);
  }
};

//LIFE
(async function controller() {
  await DBConnection();
  addMiddlewares();
  loadRoots();
  startServer();
})();
