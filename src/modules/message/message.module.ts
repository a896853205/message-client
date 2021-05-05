import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { messageProviders } from './message.providers';
// import { DatabaseModule } from '../../core/database/database.module';

@Module({
  //imports: [DatabaseModule], // import这个module需要的，需要对应的module providers，一般来说其他的module会providers它的service
  controllers: [MessageController],
  providers: [MessageService, ...messageProviders],
})
export class MessageModule {}
