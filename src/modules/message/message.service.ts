import { Injectable, Inject } from '@nestjs/common';
import { Message } from './message.entity';
import { v4 } from 'uuid';
import { Op } from 'Sequelize';

import { PAGE } from '../../core/constants/index';
import { planOutRandom } from '../../utils/randomCode';

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
      throw new Error('already exist');
    } else {
      return await this.messageRepository.create({
        message,
        type,
        code,
        uuid: v4(),
      });
    }
  }

  async allCode(typeCode: string): Promise<string[]> {
    const results = await this.messageRepository.findAndCountAll({
      attributes: ['code'],
      where: {
        code: {
          [Op.like]: `${typeCode}%`,
        },
      },
    });
    let existedCode: string[] = [];

    for (let i = 0; i < results.count; i++) {
      existedCode[i] = results.rows[i].code;
    }
    return existedCode;
  }
  async newCode(type: string): Promise<string> {
    const typeObject = {
      information: '1',
      success: '2',
      alter: '3',
      error: '4',
      unknow: '5',
    };
    const typeCode = typeObject[type] ?? '0';
    const existedCode = await this.allCode(typeCode);
    const remainCode = planOutRandom(existedCode, 6);
    const newCode = typeCode + remainCode;
    return newCode;
  }
}
