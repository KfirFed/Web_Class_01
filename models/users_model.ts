import mongoose, { Document } from "mongoose";

export interface User {
  email: string;
  password: string;
  username: string;
  _id?: string;
  refreshToken?: string[];
}

export type UserType = Document<unknown, {}, User> &
  User &
  Required<{
    _id: string;
  }> & {
    __v: number;
  };

const usersSchema = new mongoose.Schema<User>({
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
  refreshToken: {
    type: [String],
    default: [],
  },
});

const usersModel = mongoose.model("Users", usersSchema);

export default usersModel;
