import {
  Controller,
  Get,
  Query,
  Put,
  Delete,
  Res,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { MessageService } from './message.service';
import {
  SearchMessageDto,
  UpdateMessageDto,
  DeleteMessageDto,
} from './dto/message.dto';
import { Response } from 'express';
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllByCodeAndMessageAndType(
    @Query('code') code: SearchMessageDto['code'],
    @Query('message') message: SearchMessageDto['message'],
    @Query('page', new DefaultValuePipe(1), new ParseIntPipe())
    page: SearchMessageDto['page'],
    @Query('type') type: SearchMessageDto['type'],
  ) {
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
  @UseGuards(AuthGuard('jwt'))
  async alterById(
    @Query('message') message: UpdateMessageDto['message'],
    @Query('id', new ParseIntPipe())
    id: UpdateMessageDto['id'],
    @Res() res: Response,
  ) {
    const updateResult = await this.messageService.alterById(message, id);
    if (updateResult[0] < 1) {
      res.status(400).send();
    } else {
      res.status(201).send();
    }
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async deleteById(
    @Query('id', new ParseIntPipe())
    id: DeleteMessageDto['id'],
    @Res() res: Response,
  ) {
    const deleteResult = await this.messageService.deleteById(id);

    if (deleteResult > 0) {
      res.status(204).send();
    } else {
      res.status(400).send();
    }
  }
}
