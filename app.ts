import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import commentsRoute from "./routes/comments_route";
import postsRoute from "./routes/posts_route";

dotenv.config();
const app: Express = express();
const port = process.env.PORT;

mongoose.connect(process.env.DB_URL as string);
const db = mongoose.connection;

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/comments", commentsRoute);
app.use("/posts", postsRoute);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
