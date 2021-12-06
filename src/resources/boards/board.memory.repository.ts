type Column = {
  id: string;
  title: string;
  order: number;
};

type Board = {
  id: string;
  title: string;
  columns: Column[];
};

export const boardRepo: Map<string, Board> = new Map();
