const { v4: uuidv4 } = require('uuid');
const taskRepo = require('./task.memory.repository');

async function getAllTask(boardId) {
  const taskData = taskRepo.get(boardId);
  if (!taskData) return Promise.resolve(null);
  const tasks = [];
  taskData.forEach((task) => {
    tasks.push(task);
  });
  return Promise.resolve(tasks);
}

async function getTask(boardId, taskId) {
  const taskData = taskRepo.get(boardId);
  if (!taskData) return Promise.resolve(null);
  const task = taskData.get(taskId);
  if (!task) return Promise.resolve(null);
  return Promise.resolve(task);
}

async function createTask(boardId, task) {
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

async function updateTask(boardId, task) {
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

async function deleteTask(boardId, taskId) {
  const taskData = taskRepo.get(boardId);
  if (!taskData) return Promise.resolve(null);
  const deletedTask = taskData.get(taskId);
  if (!deletedTask) return Promise.resolve(null);
  taskData.delete(taskId);
  return Promise.resolve(deletedTask);
}

async function deleteAllTaskInBoard(boardId) {
  taskRepo.delete(boardId);
  return Promise.resolve();
}

async function clearUserInTasks(userId) {
  taskRepo.forEach((board) => {
    board.forEach((task) => {
      const tempTask = task;
      if (tempTask.userId === userId) tempTask.userId = null;
    })
  })
}

async function newBoard(boardId) {
  taskRepo.set(boardId, new Map());
  return Promise.resolve();
}

module.exports = {
  getAllTask,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  deleteAllTaskInBoard,
  clearUserInTasks,
  newBoard
}