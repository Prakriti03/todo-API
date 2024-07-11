import { User } from "../interfaces/user";

export const users: User[] = [
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
