import { func } from "joi";
import { GetUserQuery, User } from "../interfaces/user";
import loggerWithNameSpace from "../utils/logger";
import { BaseModel } from "./base";
import { permission } from "process";

const logger = loggerWithNameSpace("userModel");

export class userModel extends BaseModel {
  static async create(user: User) {
    const userToCreate = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    await this.queryBuilder().insert(userToCreate).table("Users");
  }

  static async update(id: String, user: User) {
    const userToUpdate = {
      name: user.name,
      email: user.email,
      password: user.password,
      updatedAt: new Date(),
    };

    const query = this.queryBuilder()
      .update(userToUpdate)
      .table("users")
      .where({ id });

    console.log(query.toString());
    const data = await query;
    return data;
  }
  static async getUsersbyQuery(filter: GetUserQuery) {
    const { q } = filter;

    const query = this.queryBuilder()
      .select("id", "name", "email", "permission")
      .table("users")
      .limit(filter.size)
      .offset((filter.page - 1) * filter.size);

    const data = await query;

    if (data) {
      await query.whereLike("name", `%${q}%`);
    }
    return query;
  }
  static async getUsers() {
    const users = this.queryBuilder().select("*").table("users");
    const data = await users;
    return data;
  }
}

export let users: User[] = [
  {
    id: "1",
    name: "Prakriti",
    email: "prakriti@gmail.com",
    password: "$2b$10$Jm7/XAw7vpdZJn7MfKoGoevMsPcEfh2prDFqivWmQlzqDBeGDO9Zq",
    permission: [
      "user.get",
      "user.getUserbyId",
      "user.createUser",
      "user.updateUser",
      "user.deleteUser",
    ],
  },
];

export function getUsers() {
  console.log(users);
  return users;
}

export function getUserbyId(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

export function getUserbyQuery(query: GetUserQuery) {
  const { q } = query;

  if (q) {
    return users.find(({ id: userId }) => userId === q);
  }
}

export function createUser(user: User) {
  return users.push({
    ...user,
    id: `${users.length + 1}`,
    permission: ["todo"],
  });
}

export function getUserbyEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}

export const updateUser = (id: string, updatedUser: User): User => {
  logger.info(`update user by id`);
  let user = users.find(({ id: userId }) => userId === id);
  user = { ...user, ...updatedUser };
  users = [...users.filter(({ id: userId }) => userId !== id), user];
  return user;
};

export function deleteUser(id: string) {
  logger.info(`delete user by id`);
  return (users = users.filter((user) => user.id !== id));
}
