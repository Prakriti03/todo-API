import request from "supertest";

import express from "express";
import router from "../../routes/index.routes";
import expect from "expect";

describe("User Integration Test Suite", () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  let accessToken: string;

  //get accesstoken
  before(async () => {
    let userCredential = {
      email: "test@test.com",
      password: "test123",
    };
    const loginResponse = await request(app)
      .post("/auth/login")
      .send(userCredential);

    accessToken = loginResponse.body.data[0].accessToken;
  });

  describe("should create a new user", () => {
    let user = {
      name: "hehe",
      email: "hehe@hehe.com",
      password: "hehe@123",
    };
    it("Should create a new user", async () => {
      let expectedOutput = {
        message: ""
      };
      const response = await request(app)
        .post("/users/create")
        .set("Authorization", `Bearer ${accessToken}`)
        .send(user);
      console.log("here");

      console.log(response.body);
      expect(response.body).toStrictEqual(expectedOutput);
    });
  });
});