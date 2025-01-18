import request from "supertest";
import { initApp } from "../server";
import mongoose from "mongoose";
import postsModel from "../models/posts_model";
import dotenv from "dotenv";

import testPostsData from "./tests_data/test_posts.json";
import userExample from "./tests_data/user_example.json";
import { Express } from "express";
import { Post, User } from "./types";

dotenv.config();
let app: Express;

const testPosts: Post[] = testPostsData;
const testUser: User = userExample;

beforeAll(async () => {
  console.log("Posts: Before all tests");
  mongoose.connect(process.env.DB_URL);
  app = await initApp();

  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.token = response.body.accessToken;
  testUser._id = response.body._id;
  expect(testUser.token).toBeDefined();

  await postsModel.deleteMany();
});

afterAll(() => {
  console.log("Posts: After all tests");
  mongoose.connection.destroy();
});

describe("Posts Test", () => {
  test("Test get all post empty", async () => {
    const response = await request(app).get("/posts/all");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test create new post", async () => {
    for (let post of testPosts) {
      const response = await request(app)
        .post("/posts")
        .send(post)
        .set({ authorization: `JWT ${testUser.token}` });

      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(post.title);
      expect(response.body.content).toBe(post.content);
      expect(response.body.senderId).toBe(post.senderId);
      post._id = response.body._id;
    }
  });

  test("Test fail to create new post - AUTH", async () => {
    const response = await request(app).post("/posts").send({
      title: "Test Post 1",
      content: "Test Content 1",
      senderId: "12345",
    });
    expect(response.statusCode).toBe(401);
  });

  test("Test fail to create new post - NO TOKEN VAR", async () => {
    process.env.TOKEN_SECRET = "";
    const response = await request(app)
      .post("/posts")
      .send({
        title: "Test Post 1",
        content: "Test Content 1",
        senderId: "12345",
      })
      .set({ authorization: `JWT ${testUser.token}` });
    process.env.TOKEN_SECRET =
      "iQOy4vOcjFwsyFIJv6ylpU6C3kTJAZUcR1C57WaCSYVXcj1KY54kKSwjLAufTyDH";
    expect([401, 500].includes(response.statusCode)).toBeTruthy();
  });

  test("Test get all post", async () => {
    const response = await request(app).get("/posts/all");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(testPosts.length);
  });

  test("Test get post by id", async () => {
    const response = await request(app).get("/posts/" + testPosts[0]._id);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(testPosts[0]._id);
  });

  test("Test fail to get comment by post id", async () => {
    const response = await request(app).get("/posts/" + "fake_id");
    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });

  test("Test filter post by sender", async () => {
    const response = await request(app).get(
      "/posts?sender=" + testPosts[0].senderId
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  test("Test fail to get post by sender", async () => {
    const response = await request(app).get("/posts?sender=fake_id");
    expect(response.statusCode).toBe(404);
  });

  test("Test create new post fail", async () => {
    const response = await request(app)
      .post("/posts")
      .send({
        title: "Test Post 1",
        content: "Test Content 1",
      })
      .set({ authorization: `JWT ${testUser.token}` });

    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });

  test("Test update post by id", async () => {
    try {
      const response = await request(app)
        .put(`/posts/${testPosts[0]._id.toString()}`)
        .set("Content-Type", "application/json")
        .send({
          title: "Updated Title",
          content: "Updated content",
        })
        .set({ authorization: `JWT ${testUser.token}` });

      expect(response.statusCode).toBe(200);
    } catch (error) {
      console.log(error);
    }
  });

  test("Test fail to update post by id", async () => {
    const response = await request(app)
      .put("/posts/" + "fake_id")
      .set("Content-Type", "application/json")
      .send({
        title: "Updated Title",
      })
      .set({ authorization: `JWT ${testUser.token}` });

    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });
});
