import { Module } from '@nestjs/common';

import { AccountService } from './account.service';
import { accountProviders } from './account.providers';
import { DatabaseModule } from '../../core/database/database.module';

@Module({
  imports: [DatabaseModule],
  exports: [AccountService],
  providers: [AccountService, ...accountProviders],
})
export class AccountModule {}
