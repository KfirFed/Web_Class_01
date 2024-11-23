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

module.exports = {
  getAllPosts,
};
