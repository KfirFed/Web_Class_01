import jwt from "jsonwebtoken";
import Tokens from "./types";

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
