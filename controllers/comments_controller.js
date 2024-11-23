const commentsModel = require("../models/comments_model");

const getCommentsByPostId = async (req, res) => {
  const postId = req.params.id;
  try {
    const comments = await commentsModel.find({ postId: postId });
    if (comments) {
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

module.exports = { getCommentsByPostId, getCommentById, createComment };
