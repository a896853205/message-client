import {
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageDto } from './dto/message.dto';
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAllByCodeAndMessageAndType(@Query() query: MessageDto) {
    //const { key, message, type } = MessageDto;
    console.log('controller messageDto', query);
    const result = await this.messageService.findAllByCodeAndMessageAndType(
      query.code,
      query.message,
      query.type,
      query.page,
    );
    console.log('controller获取service返回result:', result);
    return result;
  }

  /**
   * 根据id修改message
   * @param request
   */
  @Put()
  async alterById(@Query('id') id: number, @Query('message') message: string) {
    console.log('alter message by id');
    const updateResult = await this.messageService.alterById(
      String(message),
      id,
    );
    console.log('updateResult[0]', updateResult[0]);
    if (updateResult[0] < 1) {
      return '修改失败';
    } else {
      return '修改成功';
    }
  }

  @Delete('delete')
  async deleteById(@Query('id') id: number) {
    const deleteResult = await this.messageService.deleteById(id);
    console.log('deleteResult', deleteResult);
    return deleteResult;
  }
}
