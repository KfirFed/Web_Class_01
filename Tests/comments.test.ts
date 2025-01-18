import request from "supertest";
import { initApp } from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import dotenv from "dotenv";

import testCommentsData from "./tests_data/test_comments.json";
import userExample from "./tests_data/user_example.json";
import { Express } from "express";
import { Comment, User } from "./types";

dotenv.config();
let app: Express;

const testComments: Comment[] = testCommentsData;
const testUser: User = userExample;

beforeAll(async () => {
  console.log("Comments: Before all tests");
  mongoose.connect(process.env.DB_URL);
  app = await initApp();

  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.token = response.body.accessToken;
  testUser._id = response.body._id;
  expect(testUser.token).toBeDefined();

  await commentsModel.deleteMany();
});

afterAll(() => {
  console.log("Comments: After all tests");
  mongoose.connection.destroy();
});

describe("Comments Test", () => {
  test("Test create new comment", async () => {
    for (let comment of testComments) {
      const response = await request(app)
        .post("/comments")
        .send(comment)
        .set({ authorization: `JWT ${testUser.token}` });

      expect(response.statusCode).toBe(201);
      expect(response.body.postId).toBe(comment.postId);
      expect(response.body.content).toBe(comment.content);
      expect(response.body.owner).toBe(comment.owner);
      comment._id = response.body._id;
    }
  });

  test("Test fail to create comment", async () => {
    const response = await request(app)
      .post("/comments")
      .send({
        postId: "1234",
        content: "Test Content",
      })
      .set({ authorization: `JWT ${testUser.token}` });

    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });

  test("Test get comments by post id", async () => {
    const response = await request(app).get("/comments/post/" + 1234);
    expect(response.statusCode).toBe(200);
  });

  test("Test fail to get comments by post id", async () => {
    const response = await request(app).get("/comments/post/" + "fake_id");
    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });

  test("Test get comment by id", async () => {
    const response = await request(app).get("/comments/" + testComments[0]._id);
    expect(response.statusCode).toBe(200);
  });

  test("Test fail to get comment by id", async () => {
    const response = await request(app).get("/comments/" + "fake_id");
    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });

  test("Test update comment by id", async () => {
    const response = await request(app)
      .put("/comments/" + testComments[0]._id)
      .set("Content-Type", "application/json")
      .send({
        content: "Updated Content",
      })
      .set({ authorization: `JWT ${testUser.token}` });

    expect(response.statusCode).toBe(200);
  });

  test("Test fail to update comment by id", async () => {
    const response = await request(app)
      .put("/comments/" + "fake_id")
      .set("Content-Type", "application/json")
      .send({
        content: "Updated Content",
      })
      .set({ authorization: `JWT ${testUser.token}` });

    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });

  test("Test delete comment by id", async () => {
    const response = await request(app)
      .delete("/comments/" + testComments[0]._id)
      .set({ authorization: `JWT ${testUser.token}` });

    expect(response.statusCode).toBe(200);
  });

  test("Test fail to delete comment by id", async () => {
    const response = await request(app)
      .delete("/comments/" + "fake_id")
      .set({ authorization: `JWT ${testUser.token}` });

    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });
});
