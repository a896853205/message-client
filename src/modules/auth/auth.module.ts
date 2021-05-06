import { Module, Global } from '@nestjs/common';

import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GithubStrategy } from './github.strategy';

import { AccountModule } from '../account/account.module';
import { JWTStrategy } from './jwt.strategy';

@Global()
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
  providers: [AuthService, GithubStrategy, JWTStrategy],
})
export class AuthModule {}
