import CommentModel from "../models/commentsModel.js";

//! Fetch Comment APi Endpoint
const fetchComments = async (req, res) => {
  try {
    const allComments = await CommentModel.find().sort({ createdAt: -1 });
    res.status(200).json(allComments);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};


//! Submit Comment APi Endpoint
const insertComments = async (req, res) => {
  if (!req.body.comment) {
    return res.status(400).json({ error: "cannot submit the blank comment" });
  }
  try {
    const insertNewComment = new CommentModel(req.body);
    await insertNewComment.save();
    res.status(200).json({ error: "Commented" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
//! update Comment APi Endpoint
const updateComments = async (req, res) => {
const comment_id = req.params.id;
console.log(comment_id)
  try {
    const updateFields = {};

    const commentsExist = await CommentModel.findById(comment_id);
    if (!commentsExist) {
      res.status(404).json({ error: "Comment Not Found" });
      return;
    }
    if (!req.body.comment) {
      return res.status(400).json({ error: "cannot submit the blank comment" });
    }
    const newComment = { comment: req.body.comment}; 
    const result = await CommentModel.findByIdAndUpdate(comment_id, newComment, { new: true });
    res.status(200).json({ error: "Commented"});
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

export { insertComments, deleteComments, fetchComments, updateComments };
