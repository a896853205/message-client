import { Module } from '@nestjs/common';

import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { accountProviders } from './account.providers';

@Module({
  controllers: [AccountController],
  exports: [AccountService],
  providers: [AccountService, ...accountProviders],
})
export class AccountModule {}
