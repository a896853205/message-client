import * as dotenv from 'dotenv';

import { DatabaseConfig } from './interfaces/dbConfig.interface';

dotenv.config();

export const databaseConfig: DatabaseConfig = {
  development: {
    dialect: process.env.DB_DIALECT_DEVELOPMENT,
    host: process.env.DB_HOST_DEVELOPMENT,
    port: process.env.DB_PORT_DEVELOPMENT,
    username: process.env.DB_USERNAME_DEVELOPMENT,
    password: process.env.DB_PASSWORD_DEVELOPMENT,
    database: process.env.DB_NAME_DEVELOPMENT,
  },
  production: {
    dialect: process.env.DB_DIALECT_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    port: process.env.DB_PORT_PRODUCTION,
    username: process.env.DB_USERNAME_PRODUCTION,
    password: process.env.DB_PASSWORD_PRODUCTION,
    database: process.env.DB_NAME_PRODUCTION,
  },
};
