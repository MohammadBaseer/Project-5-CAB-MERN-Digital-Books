import CommentModel from "../models/CommentsModel.js";

//! Submit Comment APi Endpoint
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

//! Fetch Comment APi Endpoint
const fetchComments = async (req, res) => {
  try {
    const allComments = await CommentModel.find();
    res.status(200).json(allComments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

//! Delete Comment APi Endpoint
const deleteComments = async (req, res) => {
  const commentID = req.params.id;
  try {
    await CommentModel.findByIdAndDelete({ _id: commentID });
    res.status(200).json({ msg: "Comment deleted" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export { insertComments, deleteComments, fetchComments };
