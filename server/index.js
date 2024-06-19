import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import colors from "colors";
import * as dotenv from "dotenv";
import booksRoute from "./routes/booksRoute.js";
import UserRouter from "./routes/userRoute.js";
import { cloudinaryConfig } from "./config/Cloudinary.js";

dotenv.config();
const app = express();

const addMiddlewares = () => {
  app.use(express.json());
  // app.use(urlencoded({ extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  cloudinaryConfig();
};

const startServer = () => {
  const port = process.env.port || 5000;
  app.listen(port, () => {
    console.log("server is running on Por", port);
  });
};

const loadRoots = () => {


  // books
  app.use("/api", booksRoute);

  //  Users
  app.use("/auth", UserRouter);

  // Wrong Url Validation
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Endpoint doesn't exist" });
  });
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
