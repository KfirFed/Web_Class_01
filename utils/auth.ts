import jwt from "jsonwebtoken";
import { Tokens } from "./types";
import usersModel, { UserType } from "../models/users_model";

const generateToken = (userId: string): Tokens | null => {
  if (!process.env.TOKEN_SECRET) {
    return null;
  }

  const randomToken = Math.random().toString();
  const accessToken = jwt.sign(
    {
      _id: userId,
      random: randomToken,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
  );

  const refreshToken = jwt.sign(
    {
      _id: userId,
      random: randomToken,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
  );
  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

const verifyRefreshToken = (refreshToken: string | undefined) => {
  return new Promise<UserType>((resolve, reject) => {
    if (!refreshToken) {
      reject("fail");
      return;
    }
    if (!process.env.TOKEN_SECRET) {
      reject("fail");
      return;
    }
    jwt.verify(
      refreshToken,
      process.env.TOKEN_SECRET,
      async (err: any, payload: any) => {
        if (err) {
          reject("fail");
          return;
        }
        const userId = payload._id;
        try {
          const user = await usersModel.findById(userId);
          if (!user) {
            reject("fail");
            return;
          }
          if (!user.refreshToken || !user.refreshToken.includes(refreshToken)) {
            user.refreshToken = [];
            await user.save();
            reject("fail");
            return;
          }
          const tokens = user.refreshToken!.filter(
            (token) => token !== refreshToken
          );
          user.refreshToken = tokens;

          resolve(user);
        } catch (err) {
          reject("fail");
          return;
        }
      }
    );
  });
};

export { generateToken, verifyRefreshToken };
