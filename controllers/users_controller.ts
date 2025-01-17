import usersModel from "../models/users_model";

const getAllUsers = async (req, res) => {
  try {
    const users = await usersModel.find();
    res.send(users);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await usersModel.findById(userId);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const createUser = async (req, res) => {
  const userBody = req.body;
  try {
    const user = await usersModel.create(userBody);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const userBody = req.body;

  try {
    await usersModel.findByIdAndUpdate(userId, userBody);
    res.status(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    await usersModel.findByIdAndDelete(userId);
    res.status(200);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
