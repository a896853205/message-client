import { Injectable, Inject } from '@nestjs/common';
import { Message } from './message.entity';
import { v4 } from 'uuid';
import { Op } from 'Sequelize';

import { PAGE } from '../../core/constants/index';
import { randomNotInArrayAndSameLength } from '../../utils/randomCode';

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
  ): Promise<{
    count: number;
    messages: Message[];
  }> {
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

  async alterById(message: string, id: number): Promise<[number, Message[]]> {
    return await this.messageRepository.update<Message | null>(
      { message },
      {
        where: { id },
      },
    );
  }

  async deleteById(id: number): Promise<number> {
    return await this.messageRepository.destroy<Message | null>({
      where: {
        id,
      },
    });
  }

  async findRecommendMessages(
    message: string,
  ): Promise<{ count: number; recommend: string[] }> {
    const results = await this.messageRepository.findAndCountAll<Message | null>(
      {
        attributes: ['message'],
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

  async findByCode(code: string): Promise<number> {
    const results = await this.messageRepository.findAndCountAll<Message | null>(
      {
        where: {
          code,
        },
      },
    );
    return results.count;
  }

  async create(
    message: string,
    type: string,
    code: string,
  ): Promise<Message | number> {
    const results = await this.findByCode(code);
    if (results > 0) {
      return 0;
    } else {
      return await this.messageRepository.create({
        message,
        type,
        code,
        uuid: v4(),
      });
    }
  }
  
  async allCode(): Promise<string[]> {
    const results = await this.messageRepository.findAndCountAll({
      attributes: ['code'],
    });
    let existedCode: string[] = [];
    for (let i = 0; i < results.count; i++) {
      existedCode[i] = results.rows[i].code;
    }
    return existedCode;
  }
  async newCode(type: string): Promise<string> {
    const existedCode = await this.allCode();
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
    const newCode = randomNotInArrayAndSameLength(existedCode, 6, code);
    return newCode;
  }
}
