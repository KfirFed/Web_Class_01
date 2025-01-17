import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const usersModel = mongoose.model("Users", usersSchema);

export default usersModel;
