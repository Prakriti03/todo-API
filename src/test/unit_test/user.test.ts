import bcrypt from "bcrypt";
import {
  createUser,
  getUsers,
  getUserbyEmail,
} from "../../services/user.service";
import expect from "expect";
import * as UserModel from "../../model/user.model";
import sinon from "sinon";
import user from "../../interfaces/user";
import { BadRequestError } from "../../errors/badRequestError";
import { NotFoundError } from "../../errors/notFoundError";

describe("User Service Test Suite", () => {
  //get all user test
  describe("getAllUsers", () => {
    let userModelGetAllUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetAllUserStub = sinon.stub(UserModel, "getAllUsers");
    });

    afterEach(() => {
      userModelGetAllUserStub.restore();
    });

    it("should return array of users", () => {
      userModelGetAllUserStub.returns([]);
      const output = getAllUsers({});
      console.log(output);
      expect(output).toStrictEqual([]);
    });
  });

  //create a new user test
  describe("createUser", () => {
    let userModelGetUserByEmailStub: sinon.SinonStub;
    let bcryptHashStub: sinon.SinonStub;
    const user = {
      email: "test@test.com",
      name: "test",
      password: "thisispassword",
    };
    beforeEach(() => {
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
      bcryptHashStub = sinon.stub(bcrypt, "hash");
    });

    afterEach(() => {
      userModelGetUserByEmailStub.restore();
      bcryptHashStub.restore();
    });

    //successful user create
    it("should return a object with message 'User created successfully' on successful user creation", async () => {
      userModelGetUserByEmailStub.returns(undefined);
      bcryptHashStub.resolves("hashedPassword");

      const response = await createUser(user as IUser);

      const expectedOutput = {
        message: "User created successfully",
      };

      expect(response).toStrictEqual(expectedOutput);
    });

    //unsuccessful user create
    it("should throw bad request error on 'unsuccessful user create' ", async () => {
      userModelGetUserByEmailStub.returns(user);
      bcryptHashStub.resolves("hashedPassword");

      expect(async () => await createUser(user as IUser)).rejects.toThrowError(
        new BadRequestError(messageGenerator.alreadyExists("User"))
      );
    });
  });

  //get user by email test
  describe("getUserByEmail", () => {
    let testEmail = "ming@ming.com";
    let user: IUser = {
      id: "1",
      name: "Mingma",
      email: testEmail,
      password: "password",
      role: userRole.USER,
    };
    let userModelGetUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByEmailStub = sinon.stub(UserModel, "getUserByEmail");
    });

    afterEach(() => {
      userModelGetUserByEmailStub.restore();
    });

    it("should return user if user is found", () => {
      userModelGetUserByEmailStub.returns(user);

      const response = getUserByEmail(testEmail);
      expect(response).toStrictEqual(user);
    });

    it("should throw undefined user is not found", () => {
      userModelGetUserByEmailStub.returns(undefined);

      const response = getUserByEmail(testEmail);
      expect(response).toBe(undefined);
    });
  });

  
});