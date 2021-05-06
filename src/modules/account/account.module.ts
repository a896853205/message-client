import { Module } from '@nestjs/common';

import { AccountService } from './account.service';
import { accountProviders } from './account.providers';

@Module({
  exports: [AccountService],
  providers: [AccountService, ...accountProviders],
})
export class AccountModule {}
