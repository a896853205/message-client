import { Sequelize } from 'sequelize-typescript';

import { Message } from '../../modules/message/message.entity';
import { Account } from '../../modules/account/account.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'a896',
        database: 'message-client-database',
      });

      sequelize.addModels([Message, Account]);

      await sequelize.sync();

      return sequelize;
    },
  },
];
