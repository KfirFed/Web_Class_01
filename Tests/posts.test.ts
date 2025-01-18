import request from "supertest";
// import appInit from "../server";
import mongoose from "mongoose";
import postsModel from "../models/posts_model";
import dotenv from "dotenv";

import testPostsData from "./test_posts.json";
import express, { Express } from "express";

import app from "../app";

dotenv.config();
// let app: Express;
// const app: Express = express();

type Post = {
  _id?: string;
  title: string;
  content: string;
  senderId: string;
};

const testPosts: Post[] = testPostsData;

beforeAll(async () => {
  console.log("Before all tests");
  mongoose.connect(process.env.DB_URL);
  // app = await appInit();
  await postsModel.deleteMany();
});

afterAll(() => {
  console.log("After all tests");
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
      const response = await request(app).post("/posts").send(post);
      expect(response.statusCode).toBe(201);
      expect(response.body.title).toBe(post.title);
      expect(response.body.content).toBe(post.content);
      expect(response.body.senderId).toBe(post.senderId);
      post._id = response.body._id;
    }
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
    expect(response.statusCode).toBe(400);
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
    const response = await request(app).post("/posts").send({
      title: "Test Post 1",
      content: "Test Content 1",
    });
    expect(response.statusCode).toBe(400);
  });

  test("Test update post by id", async () => {
    try {
      const response = await request(app)
        .put(`/posts/${testPosts[0]._id.toString()}`)
        .set("Content-Type", "application/json")
        .send({
          title: "Updated Title",
          content: "Updated content",
        });

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
      });

    expect(response.statusCode).toBe(400);
  });
});
