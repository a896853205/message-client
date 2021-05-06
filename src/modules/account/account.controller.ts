import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('account')
export class AccountController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findSafeOne(@Request() req) {
    return req.user;
  }
}
