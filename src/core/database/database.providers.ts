import { Sequelize } from 'sequelize-typescript';

import { databaseConfig } from './database.config';
import { DEVELOPMENT, PRODUCTION } from '../constants';
import { Message } from '../../modules/message/message.entity';
import { Account } from '../../modules/account/account.entity';

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
      const sequelize = new Sequelize(config);
      sequelize.addModels([Message, Account]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
