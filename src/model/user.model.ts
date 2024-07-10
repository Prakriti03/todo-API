import { User } from "../interfaces/user";

export const users: User[] = [];

export function getUserbyId(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

export function createUser(user: User) {
  return users.push({
    ...user,
    id: `${users.length + 1}`,
  });
  console.log(users);
}

export function getUserbyEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}
