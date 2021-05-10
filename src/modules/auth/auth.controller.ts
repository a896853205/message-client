import { Controller, Request, Get, UseGuards, Redirect } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('oauth')
export class AuthController {
  @UseGuards(AuthGuard('github'))
  @Get()
  @Redirect()
  async login(@Request() req) {
    return {
      url: `http://localhost:3000/oauth/${req.user.accessToken}`,
    };
  }
}
