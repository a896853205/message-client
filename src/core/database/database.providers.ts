import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { DEVELOPMENT, PRODUCTION } from '../constants/index';
import { Message } from '../../modules/message/message.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      /* const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '130613',
        database: 'message-client-database',
      }); */
      const sequelize = new Sequelize(config);
      sequelize.addModels([Message]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
