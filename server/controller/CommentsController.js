import CommentModel from "../models/CommentsModel.js";

const insertComments = async (req, res) => {
  if (!req.body.comment) {
    return res.status(400).json({ error: "cannot submit the blank comment" });
  }

  try {
    const insertNewComment = new CommentModel(req.body);
    await insertNewComment.save();
    res.status(200).json({ msg: "Commented" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export default insertComments;
