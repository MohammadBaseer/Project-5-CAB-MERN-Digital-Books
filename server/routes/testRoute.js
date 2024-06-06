import express from "express";

const router = express.Router();
router.get("/test", (request, response) => {
  response.send({
    message: "This is this massage",
  });
});

export default router;
