const PostModel = require("../models/posts_model");

const getAllPosts = async (req, res) => {
  const owner = req.query.owner;
  try {
    if (owner) {
      const posts = await PostModel.find({ owner: owner });
      res.send(posts);
    } else {
      const posts = await PostModel.find();
      res.send(posts);
    }
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

module.exports = {
  getAllPosts,
  createPost,
};
