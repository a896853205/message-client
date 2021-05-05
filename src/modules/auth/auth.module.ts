import { Module } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AccountModule } from '../account/account.module';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env['TOKEN_KEY'],
      secretOrKeyProvider: () => process.env['TOKEN_KEY'],
      signOptions: {
        expiresIn: '1h',
      },
    }),
    AccountModule,
  ],
  controllers: [AuthController],
  providers: [GithubStrategy],
})
export class AuthModule {}
