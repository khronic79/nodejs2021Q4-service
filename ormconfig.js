const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  type: 'postgres',
  host: process.env['DB_HOST'],
  port: process.env['POSTGRES_PORT'],
  username: process.env['POSTGRES_USER'],
  password: process.env['POSTGRES_PASSWORD'],
  database: process.env['POSTGRES_DB'],
  entities: ['./**/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['./src/migration/*.ts'],
  cli: { migrationsDir: './src/migration' },
  migrationsRun: true,
};
