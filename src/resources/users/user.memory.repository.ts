import {getRepository} from "typeorm";
import { User, NewUser, UpdateUser } from '../types/types';
import { UserModel } from "./user.model";

/**
 * Return all users from repository
 *
 * @returns The promise with array of all users in repository
 *
 */
export async function getAllUsers(): Promise<User[]> {
  const usersData = await getRepository(UserModel)
    .createQueryBuilder('user')
    .getMany();
  const users = usersData.map(user => {
    const newUser = {
      id: user.id? user.id: '',
      name: user.name?  user.name: '',
      login: user.login? user.login: '',
      password: user.password? user.password: ''
    }
    return newUser;
  });
  return users;
}

/**
 * Return user according to user ID
 * 
 * @param userId - The unique user id in repository
 * 
 * @returns The promise with user's object of User type or null if user with userId does not exist
 *
 */

export async function getUser(userId: string): Promise<User | undefined> {
  const result = await getRepository(UserModel)
    .createQueryBuilder('user')
    .where('user.id = :id', {id: userId})
    .getOne();
  const user = result? {
    id: result.id? result.id: '',
    name: result.name?  result.name: '',
    login: result.login? result.login: '',
    password: result.password? result.password: ''
  }: undefined;
  return user;
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
  const insertResult = await getRepository(UserModel)
    .createQueryBuilder()
    .insert()
    .values(newUser)
    .returning(['id', 'name', 'login', 'password'])
    .execute();
  const user = insertResult.generatedMaps[0] as User;
  return user;
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
  if (!newUser.id) return null;
  const currentUser = await getRepository(UserModel)
    .createQueryBuilder('user')
    .where('user.id = :id', {id: newUser.id})
    .getOne();
  if (!currentUser) return null;
  const newRecord = {
    id: newUser.id,
    name: newUser.name? newUser.name: currentUser.name || '',
    login: newUser.login? newUser.login: currentUser.login || '',
    password: newUser.password? newUser.password: currentUser.password  || ''
  };
  await getRepository(UserModel)
    .createQueryBuilder()
    .update(UserModel)
    .set({name: newRecord.name, login: newRecord.login, password: newRecord.password})
    .where('id = :id', {id: newRecord.id})
    .execute();
  return newRecord;
}

/**
 * Delete user's record in repository and return deleted user according to user ID
 * 
 * @param userId - The unique user id in repository
 * 
 * @returns The promise with user's object of User type or null if user with userId does not exist
 *
 */
export async function deleteUser(userId: string): Promise<User | undefined> {
  const deletedResult = await getRepository(UserModel)
    .createQueryBuilder()
    .delete()
    .where("id = :id", { id: userId })
    .returning(['id', 'name', 'login', 'password'])
    .execute();
  const user = deletedResult.raw[0] as User | undefined;
  return user;
}

