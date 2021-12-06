type User = {
    id: string;
    name: string;
    login: string;
    password: string
  }

export const usersRepo: Map<string, User> = new Map();


