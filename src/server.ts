import { conf } from './common/config';
import { app } from './app';
import { logger } from './resources/logger/logger';

// logging uncaught exception
process.on('uncaughtException', (err) => {
  logger.log({
    level: 'error',
    message: err.toString() + (err.stack? err.stack.toString(): '')
  })
  process.exit(1);
});

// logging unhandled rejection
process.on('unhandledRejection', (err) => {
  const error = err as Error;
  logger.log({
    level: 'error',
    message: error.toString() + (error.stack? error.stack.toString(): '')
  })
  process.exit(1);
})

app.listen(conf.PORT, () => {
  const mess = {
    logType: "Server notification",
    logData: `App is running on http://localhost:${conf.PORT}`
  };

  // logging
  logger.log({
    level: 'info',
    message: JSON.stringify(mess)
  });
});