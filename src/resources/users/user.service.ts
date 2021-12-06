import { v4 as uuidv4 } from 'uuid';

import { usersRepo } from './user.memory.repository';

type User = {
  id: string;
  name: string;
  login: string;
  password: string
}

type NewUser = {
  name: string;
  login: string;
  password: string
}

type UpdateUser = {
  id: string;
  name?: string;
  login?: string;
  password?: string
}

async function getAllUsers(): Promise<User[]> {
  const users: User[]  = [];
  usersRepo.forEach((user) => {
      users.push(user);
  });
  return Promise.resolve(users);
}

async function getUser(userId: string): Promise<User | null> {
  const user = usersRepo.get(userId);
  if (!user) return Promise.resolve(null);
  return Promise.resolve(user);
}

async function createUser(newUser: NewUser): Promise<User | null> {
  const check = newUser.name && newUser.login && newUser.password ;
  if (!check) return Promise.resolve(null);
  const id = uuidv4();
  const newRecord = {
    id,
    name: newUser.name,
    login: newUser.login,
    password: newUser.password
  }
  usersRepo.set(id, newRecord);
  return Promise.resolve(newRecord);
}

async function updateUser(newUser: UpdateUser): Promise<User | null> {
  if (!newUser.id) return Promise.resolve(null);
  const currentUser = usersRepo.get(newUser.id);
  if (!currentUser) return Promise.resolve(null);
  const newRecord = {
      id: newUser.id,
      name: newUser.name? newUser.name: currentUser.name,
      login: newUser.login? newUser.login: currentUser.login,
      password: newUser.password? newUser.password: currentUser.password
  }
  usersRepo.set(newUser.id, newRecord);
  return Promise.resolve(newRecord);
}

async function deleteUser(userId: string): Promise<User | null> {
  const user = usersRepo.get(userId);
  if (!user) return Promise.resolve(null);
  usersRepo.delete(userId);
  return Promise.resolve(user);
}

export const usersService = { 
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
