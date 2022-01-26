export interface CreateTaskDto {
  title: string | null;
  order: number;
  description: string | null;
  userId: string | null;
  boardId: string | null;
  columnId: string | null;
}

export interface UpdateTaskDto {
  title?: string | null;
  order?: number;
  description?: string | null;
  userId?: string | null;
  boardId?: string | null;
  columnId?: string | null;
}
