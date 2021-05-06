import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('oauth')
export class AuthController {
  @UseGuards(AuthGuard('github'))
  @Get()
  async login(@Request() req) {
    return req.user;
  }
}
