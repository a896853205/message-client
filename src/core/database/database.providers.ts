import { Sequelize } from 'sequelize-typescript';
import { Message } from '../../model/message/message.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '130613',
        database: 'message-client-database',
      });
      sequelize.addModels([Message]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
