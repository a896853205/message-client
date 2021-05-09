import { DatabaseConfigAttributes } from './interfaces/dbConfig.interface';
import { DEVELOPMENT, PRODUCTION } from '../constants';

const _databaseConfigStrategy = {
  [DEVELOPMENT]: () => ({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
  [PRODUCTION]: () => ({
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  }),
};

export const databaseConfigFactory = (): DatabaseConfigAttributes => {
  console.log(process.env.NODE_ENV);
  return _databaseConfigStrategy[process.env.NODE_ENV]();
};
