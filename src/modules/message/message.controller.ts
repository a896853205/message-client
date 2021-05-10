import { Controller, Get, Query, Put, Delete } from '@nestjs/common';
import { MessageService } from './message.service';
import { SearchMessageDto, UpdateMessageDto } from './dto/message.dto';
@Controller('messages')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Get()
  async findAllByCodeAndMessageAndType(@Query() query: SearchMessageDto) {
    const result = await this.messageService.findAllByCodeAndMessageAndType(
      query.code,
      query.message,
      query.type,
      query.page,
    );
    return result;
  }

  /**
   * 根据id修改message
   * @param request
   */
  @Put()
  async alterById(@Query() query: UpdateMessageDto) {
    console.log(query);
    const updateResult = await this.messageService.alterById(
      query.message,
      query.id,
    );
    console.log('updateResult[0]', updateResult[0]);
    if (updateResult[0] < 1) {
      return '修改失败';
    } else {
      return '修改成功';
    }
  }

  @Delete()
  async deleteById(@Query() query: UpdateMessageDto) {
    const deleteResult = await this.messageService.deleteById(query.id);
    if (deleteResult > 0) {
      return '删除成功';
    } else {
      return '删除失败';
    }
  }
}
