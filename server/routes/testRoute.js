import express from "express";
import TestBookDetailModel from "../models/testBookDetail.js";
// import TestModel from "../models/testModel.js";
import TestBookModel from "../models/testBookModel.js";

const testRouter = express.Router();
testRouter.get("/test", async (req, res) => {
  // try {
  //   console.log("Sending the Data".bgGreen, req.body);
  //   const result = req.body;
  //   const Test = new TestModel({
  //     // result,
  //     test1: req.body.value1,
  //     test2: req.body.value2,
  //   });

  //   res.send({
  //     result,
  //   });

  //   await Test.save();
  // } catch (error) {
  //   res.send({
  //     error,
  //   });
  // }

  // const result = await TestBookModel.find();
  // const result = await TestBookDetailModel.find({});

  const result = await TestBookModel.find().populate("bookDetail");

  res.status(200).json({
    result,
  });
});

export default testRouter;
