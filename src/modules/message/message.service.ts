import { Injectable, Inject } from '@nestjs/common';
import { Message } from './message.entity';
const Sequelize = require('Sequelize');
const Op = Sequelize.Op;

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private messageRepository: typeof Message,
  ) {}
  async findAll() {
    return this.messageRepository.findAll<Message | null>();
  }

  async findAllByCodeAndMessageAndType(
    code: string,
    message: string,
    type: string,
    page: number,
  ) {
    const test = '';
    return this.messageRepository.findAll<Message | null>({
      where: {
        code: {
          [Op.like]: `%${code}%`,
        },
        message: {
          [Op.like]: `%${message}%`,
        },
        type: {
          [Op.like]: `%${type}%`,
        },
      },
    });
  }
  async alterById(message: string, id: number) {
    return this.messageRepository.update<Message | null>(
      { message },
      {
        where: { id },
      },
    );
  }
  async deleteById(id: number) {
    return this.messageRepository.destroy<Message | null>({
      where: {
        id,
      },
    });
  }
}
