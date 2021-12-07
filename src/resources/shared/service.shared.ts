import { v4 as uuidv4 } from 'uuid';

export async function getAll<T>(repo: Map<string, T>): Promise<T[]> {
  const result: T[]  = [];
  repo.forEach((record) => {
    result.push(record);
  });
  return Promise.resolve(result);
}

export async function getRecord<T>(id: string, repo: Map<string, T>): Promise<T | null> {
  const result = repo.get(id);
  if (!result) return Promise.resolve(null);
  return Promise.resolve(result);
}

export async function createRecord<T>(record: T, repo: Map<string, { id: string; } & T>): Promise<{ id: string; } & T> {
  const id = uuidv4();
  const newRecord = {
    id,
    ...record
  }
  repo.set(id, newRecord);
  return Promise.resolve(newRecord);
}

export async function deleteRecord<T>(id: string, repo: Map<string, T>): Promise<T | null> {
  const record = repo.get(id);
  if (!record) return Promise.resolve(null);
  repo.delete(id);
  return Promise.resolve(record);
}