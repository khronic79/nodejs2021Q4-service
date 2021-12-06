type Task = {
  id: string;
  title: string | null;
  order: number;
  description: string | null;
  userId: string | null;
  boardId: string | null;
  columnId: string | null
}

export const taskRepo: Map<string, Map<string, Task>> = new Map();