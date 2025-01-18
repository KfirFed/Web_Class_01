import request from "supertest";
import { initApp } from "../server";
import mongoose from "mongoose";
import usersModel from "../models/users_model";
import dotenv from "dotenv";

import userExample from "./tests_data/user_example.json";
import { Express } from "express";
import { User } from "./types";

dotenv.config();
let app: Express;

const testUser: User = userExample;

beforeAll(async () => {
  console.log("Users: Before all tests");
  mongoose.connect(process.env.DB_URL);
  app = await initApp();

  await usersModel.deleteMany();

  await request(app).post("/auth/register").send(testUser);
  const response = await request(app).post("/auth/login").send(testUser);
  testUser.token = response.body.accessToken;
  testUser._id = response.body._id;
  expect(testUser.token).toBeDefined();
});

afterAll(() => {
  console.log("Users: After all tests");
  mongoose.connection.destroy();
});

describe("Users Test", () => {
  test("Get all users", async () => {
    const response = await request(app).get("/users/all");
    expect(response.status).toBe(200);
  });

  test("Get user by id", async () => {
    const response = await request(app)
      .get(`/users/${testUser._id}`)
      .set({ authorization: `JWT ${testUser.token}` });
    expect(response.status).toBe(200);
  });

  test("Test fail to get user by id", async () => {
    const response = await request(app)
      .get(`/users/fake_id`)
      .set({ authorization: `JWT ${testUser.token}` });
    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });

  test("Create user", async () => {
    const response = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send({
        username: "newUser",
        password: "123456",
        email: "new@gmail.com",
      });
    expect(response.status).toBe(201);
  });

  test("Test fail to create user", async () => {
    const response = await request(app)
      .post("/users")
      .set("Content-Type", "application/json")
      .send({
        username: "newUser",
      });
    expect(response.status).toBe(400);
  });

  test("Update user by id", async () => {
    const response = await request(app)
      .put(`/users/${testUser._id}`)
      .set("Content-Type", "application/json")
      .set({ authorization: `JWT ${testUser.token}` })
      .send({
        email: "new@gmail.com",
      });
    expect(response.status).toBe(200);
  });

  test("Test fail to update user by id", async () => {
    const response = await request(app)
      .put(`/users/fake_id`)
      .set("Content-Type", "application/json")
      .set({ authorization: `JWT ${testUser.token}` })
      .send({
        email: "fake@fake.com",
      });
    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });

  test("Delete user by id", async () => {
    const response = await request(app)
      .delete(`/users/${testUser._id}`)
      .set("Content-Type", "application/json")
      .set({ authorization: `JWT ${testUser.token}` });
    expect(response.status).toBe(200);
  });

  test("Test fail to delete user by id", async () => {
    const response = await request(app)
      .delete(`/users/fake_id`)
      .set("Content-Type", "application/json")
      .set({ authorization: `JWT ${testUser.token}` });
    expect([404, 400].includes(response.statusCode)).toBeTruthy();
  });  
});
