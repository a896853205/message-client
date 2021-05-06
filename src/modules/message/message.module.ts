import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { messageProviders } from './message.providers';

@Module({
  controllers: [MessageController],
  providers: [MessageService, ...messageProviders],
})
export class MessageModule {}
