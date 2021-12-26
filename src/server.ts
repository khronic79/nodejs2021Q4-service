import { conf } from './common/config';
import { app } from './app';
import { logger } from './resources/logger/logger';

// logging uncaught exception
process.on('uncaughtException', (err) => {
  logger.log({
    level: 'fatal',
    message: `Uncaught Exception: ${err.toString()} ${err.stack? err.stack.toString(): ''}`
  });
  setTimeout(() => {
    process.exit(1);
  }, 2000);
});

// logging unhandled rejection
process.on('unhandledRejection', (err) => {
  const error = err as Error;
  logger.log({
    level: 'fatal',
    message: `Unhandled Rejection: ${ error.toString()} ${error.stack? error.stack.toString(): ''}`
  })
  setTimeout(() => {
    process.exit(1);
  }, 2000);
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

// throw new Error('Check Uncaught Exception');