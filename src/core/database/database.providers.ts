import { Sequelize } from 'sequelize-typescript';

import { Message } from '../../modules/message/message.entity';
import { Account } from '../../modules/account/account.entity';
import config from './database.config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(config());
      sequelize.addModels([Message, Account]);
      await sequelize.sync();

      return sequelize;
    },
  },
];
