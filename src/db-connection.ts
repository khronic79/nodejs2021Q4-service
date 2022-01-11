import { Connection } from "typeorm";

interface DataBaseConnection {
  connection: Connection | null;
}

export const dataBaseConnection: DataBaseConnection = {
  connection: null,
}