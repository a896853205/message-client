import { DatabaseConfigAttributes } from './interfaces/dbConfig.interface';
import { DEVELOPMENT, PRODUCTION } from '../constants';

const _databaseConfigStrategy = {
  [DEVELOPMENT]: () => ({
    dialect: process.env.DB_DIALECT_DEVELOPMENT,
    host: process.env.DB_HOST_DEVELOPMENT,
    port: Number(process.env.DB_PORT_DEVELOPMENT),
    username: process.env.DB_USERNAME_DEVELOPMENT,
    password: process.env.DB_PASSWORD_DEVELOPMENT,
    database: process.env.DB_NAME_DEVELOPMENT,
  }),
  [PRODUCTION]: () => ({
    dialect: process.env.DB_DIALECT_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    port: Number(process.env.DB_PORT_PRODUCTION),
    username: process.env.DB_USERNAME_PRODUCTION,
    password: process.env.DB_PASSWORD_PRODUCTION,
    database: process.env.DB_NAME_PRODUCTION,
  }),
};

export const databaseConfigFactory = (): DatabaseConfigAttributes => {
  return _databaseConfigStrategy[process.env.NODE_ENV]();
};
