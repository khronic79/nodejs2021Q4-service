import { Task } from '../types/types';

/**
 * Repository for tasks
 */
export const taskRepo: Map<string, Map<string, Task>> = new Map();