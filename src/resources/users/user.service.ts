import { usersRepo } from './user.memory.repository';
import { User, NewUser, UpdateUser } from '../types/types';
import { getAll, getRecord, deleteRecord, createRecord } from '../shared/service.shared';

async function getAllUsers(): Promise<User[]> {
  return getAll(usersRepo);
}

async function getUser(userId: string): Promise<User | null> {
  return getRecord(userId, usersRepo);
}

async function createUser(newUser: NewUser): Promise<User> {
  return createRecord(newUser, usersRepo);
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
  return deleteRecord(userId, usersRepo);
}

export const usersService = { 
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
