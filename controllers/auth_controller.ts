import { Request, Response } from "express";
import bcrypt from "bcrypt";
import userModel from "../models/users_model";

const register = async (req: Request, res: Response) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      email: req.body.email,
      password: hashedPassword,
    });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

export default { register };
