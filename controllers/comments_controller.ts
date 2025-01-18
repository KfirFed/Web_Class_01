import commentsModel from "../models/comments_model";

const getCommentsByPostId = async (req, res) => {
  const postId = req.params.id;
  try {
    const comments = await commentsModel.find({ postId: postId });
    if (comments && comments.length > 0) {
      res.send(comments);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getCommentById = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await commentsModel.findById(commentId);
    if (comment) {
      res.send(comment);
    } else {
      res.status(404).send("Comment not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createComment = async (req, res) => {
  const commentBody = req.body;
  try {
    const comment = await commentsModel.create(commentBody);
    res.status(201).send(comment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteCommentById = async (req, res) => {
  const commentId = req.params.id;
  try {
    const comment = await commentsModel.findByIdAndDelete(commentId);
    res.status(200).send(comment);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateCommentById = async (req, res) => {
  const commentId = req.params.id;
  const commentBody = req.body;

  try {
    const comment = await commentsModel.findByIdAndUpdate(
      commentId,
      commentBody
    );
    if (!comment) {
      res.status(404).send("Comment not found");
    }
    {
      res.status(200).send("Comment updated");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  getCommentsByPostId,
  getCommentById,
  createComment,
  deleteCommentById,
  updateCommentById,
};
