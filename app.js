const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const commentsRoute = require("./routes/comments_route");
app.use("/comments", commentsRoute);

const postsRoute = require("./routes/posts_route");
app.use("/posts", postsRoute);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
