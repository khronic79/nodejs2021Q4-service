import { createConnection } from "typeorm";
import { conf } from './common/config';
import { app } from './app';
import { logger } from './resources/logger/logger';
import { dataBaseConnection } from "./db-connection";
import "reflect-metadata";

createConnection()
  .then(async connection => {
    dataBaseConnection.connection = connection;
    app.listen(conf.PORT, () => {
      const mess = {
        logType: "Server notification",
        logData: `App is running on http://localhost:${conf.PORT}`
      };
      logger.log({
        level: 'info',
        message: JSON.stringify(mess)
      });
    });
  })
  .catch(error => {
    logger.log({
      level: 'error',
      message: error.toString()
    });
  });