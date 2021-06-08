import {
  Controller,
  Get,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
  Query,
  Request,
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AccountService } from './account.service';
import { SearchAccountDto, PutIsAuthAccountDto } from './dto/account.dto';

@Controller('accounts')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/one')
  async findSafeOne(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async account(
    @Query('name', new DefaultValuePipe('')) name: SearchAccountDto['name'],
    @Query('isAuth', new DefaultValuePipe(''))
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

  @UseGuards(AuthGuard('jwt'))
  @Put('/isAuth')
  async changeIsAuth(
    @Query('uuid')
    uuid: PutIsAuthAccountDto['uuid'],
    @Query('isAuth', new ParseIntPipe())
    isAuth: PutIsAuthAccountDto['isAuth'],
  ) {
    return await this.accountService.changeIsAuth(uuid, isAuth);
  }
}
