import {
  Controller,
  Get,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AccountService } from './account.service';
import { SearchAccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  /* @UseGuards(AuthGuard('jwt'))
  @Get()
  async findSafeOne(@Request() req) {
    return req.user;
  } */

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async account(
    @Query('name', new DefaultValuePipe('')) name: SearchAccountDto['name'],
    @Query('isAuth', new DefaultValuePipe(1), new ParseIntPipe())
    isAuth: SearchAccountDto['isAuth'],
    @Query('page', new DefaultValuePipe(1), new ParseIntPipe())
    page: SearchAccountDto['page'],
  ) {
    const searchResults = await this.accountService.account(name, isAuth, page);
    return {
      accounts: searchResults.rows,
      count: searchResults.count,
    };
  }
}
