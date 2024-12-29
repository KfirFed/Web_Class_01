const PostModel = require("../models/posts_model");

const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createPost = async (req, res) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await PostModel.findById(postId);
    if (post) {
      res.send(post);
    } else {
      res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAllPostsBySenderId = async (req, res) => {
  const sender = req.query.sender;

  try {
    const posts = await PostModel.find({ senderId: sender });
    res.send(posts);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getAllPosts,
  createPost,
  getPostById,
  getAllPostsBySenderId
};
