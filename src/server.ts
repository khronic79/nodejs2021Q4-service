import { createConnection } from "typeorm";
import { conf } from './common/config';
import { app } from './app';
import { logger } from './resources/logger/logger';
import { createAdminRecord } from './resources/users/user.service'
import "reflect-metadata";

createConnection()
  .then(async () => {
    await createAdminRecord();
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