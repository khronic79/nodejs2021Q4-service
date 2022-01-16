export type Task = {
  id: string;
  title: string | null;
  order: number;
  description: string | null;
  userId: string | null;
  boardId: string | null;
  columnId: string | null
}

export type NewTask = {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string
}

export type UpdateTask = {
  id: string;
  title?: string;
  order?: number;
  description?: string;
  userId?: string;
  boardId?: string;
  columnId?: string
}

export type User = {
  id: string;
  name: string;
  login: string;
  password: string
}

export type NewUser = {
  name: string;
  login: string;
  password: string
}

export type UpdateUser = {
  id: string;
  name?: string;
  login?: string;
  password?: string
}

export type Column = {
  id: string;
  title: string;
  order: number;
};

export type NewColumn = {
  title: string;
  order: number;
}

export type Board = {
  id: string;
  title: string;
  columns: Column[];
};

export type NewBoard = {
  title: string;
  columns: NewColumn[];
};

export type UpdatedBoard = {
  id: string;
  title?: string;
  columns?: Column[];
};