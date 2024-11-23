const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));