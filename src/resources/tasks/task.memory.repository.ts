import { getRepository } from 'typeorm';
import { TaskModel } from './task.model';
import { BoardModel } from '../boards/board.model';
import { NewTask, UpdateTask } from '../types/types';


/**
 * Return all tasks from repository for a specific board
 * 
 * @param boardId - The board which includes tasks
 *
 * @returns The promise with array of all tasks in repository for board with boardId
 *
 */
export async function getAllTask(boardId: string): Promise<TaskModel[] | undefined> {
  const boardData = await getRepository(TaskModel)
    .find({where: [{boardId}]});
  if (!boardData) return undefined;
  return boardData;
}

/**
 * Return task according to task ID from repository for a specific board
 * 
 * @param boardId - The unique board id in repository
 * @param taskId - The unique task id in repository
 * 
 * @returns The promise with task's object of Task type or null if task or board with userId or boardId do not not exist
 *
 */
export async function getTask(boardId: string, taskId: string): Promise<TaskModel | undefined> {
  const boardData = await getRepository(TaskModel)
    .findOne(taskId, {where: [{boardId}]});
  if (!boardData) return undefined;
  return boardData;
}

/**
 * Create a new task in repository for a specific board
 * 
 * @param boardId - The unique board id in repository
 * @param newTask - Object of NewTask type with task's data
 * 
 * @returns The promise with created task's object of Task type or null if NewTask has not needed data (not according to NewTask type)
 *
 */
export async function createTask(boardId: string, newTask: NewTask): Promise<TaskModel | undefined> {
  const insertTask = newTask;
  const board = await getRepository(BoardModel)
    .findOne(boardId);
  if (!board) return undefined;
  insertTask.boardId = boardId;
  const task = await getRepository(TaskModel)
    .save(insertTask);
  return task;
}

/**
 * Update existed task in repository for a specific board
 * 
 * @param boardId - The unique board id in repository
 * @param newTask - Object of UpdateTask type with task's data
 * 
 * @returns The promise with updated task's object of Task type or null if UpdateTask has not needed data (not according to UpdateTask type)
 *
 */
export async function updateTask(boardId: string, newTask: UpdateTask): Promise<TaskModel | undefined> {
  const insertTask = newTask;
  const board = await getRepository(BoardModel)
    .findOne(boardId);
  if (!board) return undefined;
  const existedTask = await getRepository(TaskModel)
    .findOne(newTask.id);
  if (!existedTask) return undefined;
  insertTask.boardId = boardId;
  const task = await getRepository(TaskModel)
    .save(insertTask);
  return task;
}

/**
 * Delete task in repository for a specific board
 * 
 * @param boardId - The unique board id in repository
 * @param taskId - The unique task id in repository
 * 
 * @returns The promise with deleted task's object of Task type or null if task or board with taskId or boardId do not not exist
 *
 */
export async function deleteTask(boardId: string, taskId: string): Promise<TaskModel | null> {
  const deletedResult = await getRepository(TaskModel)
    .createQueryBuilder()
    .delete()
    .where("id = :id and boardId = :boardId", { id: taskId, boardId })
    .returning(['id'])
    .execute();
  const board = deletedResult.raw[0];
  return board;
}
