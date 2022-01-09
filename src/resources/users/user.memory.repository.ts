import { usersRepo } from '../db/user.db';
import { User, NewUser, UpdateUser } from '../types/types';
import { getAll, getRecord, deleteRecord, createRecord } from '../shared/service.shared';

/**
 * Return all users from repository
 *
 * @returns The promise with array of all users in repository
 *
 */
 export async function getAllUsers(): Promise<User[]> {
  return getAll(usersRepo);
}

/**
 * Return user according to user ID
 * 
 * @param userId - The unique user id in repository
 * 
 * @returns The promise with user's object of User type or null if user with userId does not exist
 *
 */
 export async function getUser(userId: string): Promise<User | null> {
  return getRecord(userId, usersRepo);
}

/**
 * Create a new user in repository
 * 
 * @param newUser - Object of NewUser type with users's data
 * 
 * @returns The promise with created user's object of User type or null if newUser has not needed data (not according to NewUser type)
 *
 */
 export async function createUser(newUser: NewUser): Promise<User> {
  return createRecord(newUser, usersRepo);
}

/**
 * Update an existed user in repository
 * 
 * @param newUser - Object of UpdateUser type with users's data
 * 
 * @returns The promise with created user's object or null if newUser has not needed data (not according to UpdateUser type)
 *
 */
 export async function updateUser(newUser: UpdateUser): Promise<User | null> {
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

/**
 * Delete user's record in repository and return deleted user according to user ID
 * 
 * @param userId - The unique user id in repository
 * 
 * @returns The promise with user's object of User type or null if user with userId does not exist
 *
 */
export async function deleteUser(userId: string): Promise<User | null> {
  return deleteRecord(userId, usersRepo);
}
