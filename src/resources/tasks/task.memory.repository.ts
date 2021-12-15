import { v4 as uuidv4 } from 'uuid';
import { taskRepo } from '../db/task.db';
import { Task, NewTask, UpdateTask } from '../types/types';
import { getAll, getRecord, deleteRecord } from '../shared/service.shared';

/**
 * Return all tasks from repository for a specific board
 * 
 * @param boardId - The board which includes tasks
 *
 * @returns The promise with array of all tasks in repository for board with boardId
 *
 */
export async function getAllTask(boardId: string): Promise<Task[] | null> {
  const taskData = taskRepo.get(boardId);
  if (!taskData) return Promise.resolve(null);
  return getAll(taskData);
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
export async function getTask(boardId: string, taskId: string): Promise<Task | null> {
  const taskData = taskRepo.get(boardId);
  if (!taskData) return Promise.resolve(null);
  return getRecord(taskId, taskData);
}

/**
 * Create a new task in repository for a specific board
 * 
 * @param boardId - The unique board id in repository
 * @param task - Object of NewTask type with task's data
 * 
 * @returns The promise with created task's object of Task type or null if NewTask has not needed data (not according to NewTask type)
 *
 */
export async function createTask(boardId: string, task: NewTask): Promise<Task | null> {
  const taskData = taskRepo.get(boardId);
  if (!taskData) return Promise.resolve(null);
  const check = (task.title !== undefined) && (task.order !== undefined) && (task.description !== undefined) && (task.userId !== undefined);
  if (!check) return Promise.resolve(null);
  const id = uuidv4();
  const newRecord = {
      id,
      boardId,
      title: task.title,
      order: task.order,
      description: task.description,
      userId: task.userId,
      columnId: task.columnId
  };
  taskData.set(id, newRecord);
  return Promise.resolve(newRecord);
}

/**
 * Update existed task in repository for a specific board
 * 
 * @param boardId - The unique board id in repository
 * @param task - Object of UpdateTask type with task's data
 * 
 * @returns The promise with updated task's object of Task type or null if UpdateTask has not needed data (not according to UpdateTask type)
 *
 */
export async function updateTask(boardId: string, task: UpdateTask): Promise<Task | null> {
  const taskData = taskRepo.get(boardId);
  if (!taskData) return Promise.resolve(null);
  const currentTask = taskData.get(task.id);
  if (!currentTask) return Promise.resolve(null);
  const updatedRecord = {
    boardId,
    id: task.id,
    title: (task.title !== undefined)? task.title: currentTask.title,
    order: (task.order !== undefined)? task.order: currentTask.order,
    description: (task.description !== undefined)? task.description: currentTask.description,
    userId: (task.userId !== undefined)? task.userId: currentTask.userId,
    columnId: (task.columnId !== undefined)? task.columnId: currentTask.columnId,
  };
  taskData.set(task.id, updatedRecord);
  return Promise.resolve(updatedRecord);
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
export async function deleteTask(boardId: string, taskId: string): Promise<Task | null> {
  const taskData = taskRepo.get(boardId);
  if (!taskData) return Promise.resolve(null);
  return deleteRecord(taskId, taskData);
}

/**
 * Delete all tasks in repository for a specific board
 * 
 * @param boardId - The unique board id in repository
 * 
 * @returns The promise void
 *
 */
export async function deleteAllTaskInBoard(boardId: string): Promise<void> {
  taskRepo.delete(boardId);
  return Promise.resolve();
}

/**
 * Update all task in repository assigned for a specific user for delete user operation
 * 
 * @param userId - The unique user id in repository
 * 
 * @returns The promise void
 *
 */
export async function clearUserInTasks(userId: string): Promise<void> {
  taskRepo.forEach((board) => {
    board.forEach((task) => {
      const tempTask = task;
      if (tempTask.userId === userId) tempTask.userId = null;
    })
  })
}

/**
 * Create repository for a specific board in global task's repository
 * 
 * @param boardId - The unique board id in repository
 * 
 * @returns The promise void
 *
 */
export async function newBoardForTask(boardId: string): Promise<void> {
  taskRepo.set(boardId, new Map());
  return Promise.resolve();
}
