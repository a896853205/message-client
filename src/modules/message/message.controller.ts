import { Controller, Get, Query, Put, Delete, Res } from '@nestjs/common';
import { MessageService } from './message.service';
import {
  SearchMessageDto,
  UpdateMessageDto,
  DeleteMessageDto,
} from './dto/message.dto';
import { ParseIntPipe } from '../../core/pipes/parseIntPipe';
import { Response } from 'express';
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  async findAllByCodeAndMessageAndType(
    @Query('code') code: SearchMessageDto['code'],
    @Query('message') message: SearchMessageDto['message'],
    @Query('page', new ParseIntPipe()) page: SearchMessageDto['page'],
    @Query('type') type: SearchMessageDto['type'],
  ) {
    if (page === 0) {
      page = 1;
    }
    const result = await this.messageService.findAllByCodeAndMessageAndType(
      code,
      message,
      type,
      page,
    );
    return result;
  }

  /**
   * 根据id修改message
   * @param request
   */
  @Put()
  async alterById(
    @Query('message') message: UpdateMessageDto['message'],
    @Query('id', new ParseIntPipe()) id: UpdateMessageDto['id'],
    @Res() res: Response,
  ) {
    const updateResult = await this.messageService.alterById(message, id);
    if (updateResult[0] < 1) {
      return '修改失败';
    } else {
      res.status(201).send();
    }
  }

  @Delete()
  async deleteById(
    @Query('id', new ParseIntPipe()) id: DeleteMessageDto['id'],
    @Res() res: Response,
  ) {
    const deleteResult = await this.messageService.deleteById(id);

    if (deleteResult > 0) {
      res.status(204).send();
    } else {
      return '删除失败';
    }
  }
}
