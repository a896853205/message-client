import { Injectable, Inject } from '@nestjs/common';
import { Message } from './message.entity';
import { v4 } from 'uuid';
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
  async findRecommendMessages(message: string) {
    const results = await this.messageRepository.findAndCountAll<Message | null>(
      {
        where: {
          message: {
            [Op.like]: `%${message}%`,
          },
        },
      },
    );
    let recommend: string[] = [];
    for (let i = 0; i < results.count; i++) {
      recommend[i] = results.rows[i].message;
    }
    return {
      count: results.count,
      recommend,
    };
  }
  async create(message: string, type: string, code: string): Promise<Message> {
    return await this.messageRepository.create({
      message,
      type,
      code,
      uuid: v4(),
    });
  }

  newCode(type: string) {
    console.log('service get type:', type);
    let code: string = '';
    switch (type) {
      case 'male':
        code = '1';
        break;
      case 'success':
        code = '2';
        break;
      case 'alter':
        code = '3';
        break;
      case 'error':
        code = '4';
        break;
      case 'unknow':
        code = '5';
        break;
    }
    for (let i = 0; i < 5; i++) {
      code += String(Math.round(Math.random() * 10));
    }
    console.log('生成的随机六位code：', code);
    return code;
  }
}
