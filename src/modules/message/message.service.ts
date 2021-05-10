import { Injectable, Inject } from '@nestjs/common';
import { Message } from './message.entity';
import { Op } from 'Sequelize';

import { PAGE } from '../../core/constants/index';

@Injectable()
export class MessageService {
  constructor(
    @Inject('MESSAGE_REPOSITORY')
    private messageRepository: typeof Message,
  ) {}

  async findAllByCodeAndMessageAndType(
    code: string,
    message: string,
    type: string,
    page: number,
  ) {
    console.log('service', page);
    const results = await this.messageRepository.findAndCountAll<Message | null>(
      {
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
        offset: Number((page - 1) * PAGE),
        limit: PAGE, // 假设一页展示5项
      },
    );
    return {
      count: results.count,
      messages: results.rows,
    };
  }
  async alterById(message: string, id: number) {
    return await this.messageRepository.update<Message | null>(
      { message },
      {
        where: { id },
      },
    );
  }
  async deleteById(id: number) {
    return await this.messageRepository.destroy<Message | null>({
      where: {
        id,
      },
    });
  }
}
