import { Controller, Get, Param } from '@nestjs/common';

@Controller('message')
export class MessageController {
  @Get()
  findAll(): string {
    return 'all message';
  }
  @Get(':key')
  findOne(@Param('key') key: number): string {
    return 'response message';
  }
}
