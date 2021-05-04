import { Injectable, Inject } from '@nestjs/common';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private messageRepository: typeof Message,
  ) {}
}
