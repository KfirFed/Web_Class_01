import request from "supertest";
// import appInit from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import dotenv from "dotenv";

import testCommentsData from "./test_comments.json";
import express, { Express } from "express";

import app from "../app";

dotenv.config();
// let app: Express;
// const app: Express = express();

type Comment = {
  _id?: string;
  postId: string;
  content: string;
  owner: string;
};

const testComments: Comment[] = testCommentsData;

beforeAll(async () => {
  console.log("Before all tests");
  mongoose.connect(process.env.DB_URL);
  // app = await appInit();
  await commentsModel.deleteMany();
});

afterAll(() => {
  console.log("After all tests");
  mongoose.connection.destroy();
});

describe("Comments Test", () => {
  test("Test create new comment", async () => {
    for (let comment of testComments) {
      const response = await request(app).post("/comments").send(comment);
      expect(response.statusCode).toBe(201);
      expect(response.body.postId).toBe(comment.postId);
      expect(response.body.content).toBe(comment.content);
      expect(response.body.owner).toBe(comment.owner);
      comment._id = response.body._id;
    }
  });

  test("Test fail to create comment", async () => {
    const response = await request(app).post("/comments").send({
      postId: "1234",
      content: "Test Content",
    });
    expect(response.statusCode).toBe(400);
  });

  test("Test get comments by post id", async () => {
    const response = await request(app).get("/comments/post/" + 1234);
    expect(response.statusCode).toBe(200);
  });

  test("Test fail to get comments by post id", async () => {
    const response = await request(app).get("/comments/post/" + "fake_id");
    expect(response.statusCode).toBe(404);
  });

  test("Test get comment by id", async () => {
    const response = await request(app).get("/comments/" + testComments[0]._id);
    expect(response.statusCode).toBe(200);
  });

  test("Test fail to get comment by id", async () => {
    const response = await request(app).get("/comments/" + "fake_id");
    expect(response.statusCode).toBe(404);
  });

  test("Test update comment by id", async () => {
    const response = await request(app)
      .put("/comments/" + testComments[0]._id)
      .set("Content-Type", "application/json")
      .send({
        content: "Updated Content",
      });

    expect(response.statusCode).toBe(200);
  });

  test("Test fail to update comment by id", async () => {
    const response = await request(app)
      .put("/comments/" + "fake_id")
      .set("Content-Type", "application/json")
      .send({
        content: "Updated Content",
      });

    expect(response.statusCode).toBe(200);
  });

  test("Test delete comment by id", async () => {
    const response = await request(app).delete(
      "/comments/" + testComments[0]._id
    );
    expect(response.statusCode).toBe(200);
  });

  test("Test fail to delete comment by id", async () => {
    const response = await request(app).delete("/comments/" + "fake_id");
    expect(response.statusCode).toBe(404);
  });
});
