import { v4 as uuidv4 } from 'uuid';

/**
 * Return all records from repository according to type of object in repository
 *
 * @param repo - The repository which stores needed records
 * 
 * @returns The promise with array of all recorded object in repository
 *
 */
export async function getAll<T>(repo: Map<string, T>): Promise<T[]> {
  const result: T[]  = [];
  repo.forEach((record) => {
    result.push(record);
  });
  return Promise.resolve(result);
}

/**
 * Return record from repository according to record ID and type of object in repository
 * 
 * @param id - The unique record's id in repository
 * @param repo - The repository which stores needed record
 * 
 * @returns The promise with recorded object or null if record with id does not exist in repository
 *
 */
export async function getRecord<T>(id: string, repo: Map<string, T>): Promise<T | null> {
  const result = repo.get(id);
  if (!result) return Promise.resolve(null);
  return Promise.resolve(result);
}

/**
 * Create a new record in repository
 * 
 * @param record - Object of new record withoud id
 * @param repo - The repository which stores needed record
 * 
 * @returns The promise with created recorded object
 *
 */
export async function createRecord<T>(record: T, repo: Map<string, { id: string; } & T>): Promise<{ id: string; } & T> {
  const id = uuidv4();
  const newRecord = {
    id,
    ...record
  }
  repo.set(id, newRecord);
  return Promise.resolve(newRecord);
}

/**
 * Delete record in repository and return deleted record according to user ID
 * 
 * @param id - The unique record id in repository
 * 
 * @returns The promise with record's object or null if record with id does not exist
 *
 */
export async function deleteRecord<T>(id: string, repo: Map<string, T>): Promise<T | null> {
  const record = repo.get(id);
  if (!record) return Promise.resolve(null);
  repo.delete(id);
  return Promise.resolve(record);
}