import { func } from "joi";
import { GetUserByQuery, User } from "../interfaces/user";
import loggerWithNameSpace from "../utils/logger";

const logger = loggerWithNameSpace("userModel");


export let users: User[] = [
  {
    id: "1",
    name: "Prakriti",
    email: "prakriti@gmail.com",
    password: "$2b$10$Jm7/XAw7vpdZJn7MfKoGoevMsPcEfh2prDFqivWmQlzqDBeGDO9Zq",
    role: "admin",
  },
];

export function getUsers() {
  console.log(users);
  return users;
}

export function getUserbyId(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

export function getUserbyQuery(query : GetUserByQuery){
  const {q} = query;

  if(q){
    return users.find(({id:userId})=> userId===q)
  }
}

export function createUser(user: User) {
  return users.push({
    ...user,
    id: `${users.length + 1}`,
    role: "user",
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
  return (users = users.filter((user) =>user.id !== id));
}

