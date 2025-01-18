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
  console.log("Auth: Before all tests");
  mongoose.connect(process.env.DB_URL);
  app = await initApp();

  await usersModel.deleteMany();
});

afterAll(() => {
  console.log("Auth: After all tests");
  mongoose.connection.destroy();
});

describe("Auth Test", () => {
  test("Register user", async () => {
    const response = await request(app).post("/auth/register").send(testUser);
    expect(response.status).toBe(200);

    testUser._id = response.body._id;
  });

  test("Test fail to register user", async () => {
    const response = await request(app).post("/auth/register").send({});
    expect(response.status).toBe(400);
  });

  test("Test fail to login user", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "fake_email",
      password: "fake_password",
    });
    expect(response.status).toBe(400);
  });

  test("Test fail to login user - WRONG PASSWORD", async () => {
    const response = await request(app).post("/auth/login").send({
      username: testUser.username,
      email: testUser.email,
      password: "fake_password",
    });
    expect(response.status).toBe(400);
  });

  test("Test fail to login user - NO TOKEN VAR", async () => {
    process.env.TOKEN_SECRET = "";
    const response = await request(app).post("/auth/login").send(testUser);
    process.env.TOKEN_SECRET =
      "iQOy4vOcjFwsyFIJv6ylpU6C3kTJAZUcR1C57WaCSYVXcj1KY54kKSwjLAufTyDH";
    expect(response.status).toBe(500);
  });

  test("Login user", async () => {
    const response = await request(app).post("/auth/login").send(testUser);
    testUser.token = response.body.refreshToken;
    expect(response.status).toBe(200);
  });

  test("Refresh token", async () => {
    const response = await request(app)
      .post("/auth/refresh")
      .set({ authorization: testUser.token });
    expect(response.status).toBe(200);
  });

  test("Test fail to refresh token", async () => {
    const response = await request(app).post("/auth/refresh");
    expect(response.status).toBe(400);
  });

  test("Test fail to refresh token - TOKEN", async () => {
    process.env.TOKEN_SECRET = "";
    const response = await request(app).post("/auth/refresh").send(testUser);
    process.env.TOKEN_SECRET =
      "iQOy4vOcjFwsyFIJv6ylpU6C3kTJAZUcR1C57WaCSYVXcj1KY54kKSwjLAufTyDH";
    expect([400, 500].includes(response.status)).toBeTruthy();
  });

  test("Logout user", async () => {
    const loginRes = await request(app).post("/auth/login").send(testUser);
    testUser.token = loginRes.body.refreshToken;

    const response = await request(app)
      .post("/auth/logout")
      .set({ authorization: testUser.token });
    expect(response.status).toBe(200);
  });

  test("Test fail to logout user", async () => {
    const response = await request(app).post("/auth/logout");
    expect(response.status).toBe(400);
  });
});
