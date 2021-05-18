import {
  Controller,
  Get,
  Query,
  Put,
  Delete,
  Post,
  Body,
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
  CreateMessageDto,
} from './dto/message.dto';
import { Response } from 'express';
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAllByCodeAndMessageAndType(
    @Query('code', new DefaultValuePipe('')) code: SearchMessageDto['code'],
    @Query('message', new DefaultValuePipe(''))
    message: SearchMessageDto['message'],
    @Query('page', new DefaultValuePipe(1), new ParseIntPipe())
    page: SearchMessageDto['page'],
    @Query('type', new DefaultValuePipe('')) type: SearchMessageDto['type'],
  ) {
    return await this.messageService.findAllByCodeAndMessageAndType(
      code,
      message,
      type,
      page,
    );
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

  @Get('recommend')
  @UseGuards(AuthGuard('jwt'))
  async findRecommendMessages(
    @Query('message', new DefaultValuePipe(''))
    message: SearchMessageDto['message'],
    @Res() res: Response,
  ) {
    const results = await this.messageService.findRecommendMessages(message);
    res.send(results);
  }
  @Get('newCode')
  @UseGuards(AuthGuard('jwt'))
  async newCode(
    @Query('type', new DefaultValuePipe(''))
    type: SearchMessageDto['type'],
    @Res() res: Response,
  ) {
    try {
      const code = await this.messageService.newCode(type);
      res.send({ code });
    } catch (errorInfo) {
      res.status(400).send();
    }
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body('message') message: CreateMessageDto['message'],
    @Body('type') type: CreateMessageDto['type'],
    @Body('code') code: CreateMessageDto['code'],
    @Res() res: Response,
  ) {
    try {
      const createResult = await this.messageService.create(
        message,
        type,
        code,
      );
      if (createResult) {
        res.status(200).send(createResult);
      } else {
        // FIXME：上面整体都catch住了，service层应该判断是否创建成功的逻辑，如果不成功throw，外边这边就不用判断了，try直接返回200就好
        res.status(400).send();
      }
    } catch (errorInfo) {
      // FIXME: 这块逻辑要分开，如果是自己抛出来的错误就返回400，如果是其他错误就返回500
      console.error(errorInfo);

      res.status(400).send('code已经存在，请重新生成！');
    }
  }
}
