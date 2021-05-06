import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AccountService } from '../account/account.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private accountService: AccountService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env['TOKEN_KEY'],
    });
  }

  async validate({ id }) {
    // check if user in the token actually exist
    const account = await this.accountService.findOneById(id);

    if (!account) {
      throw new UnauthorizedException(
        'You are not authorized to perform the operation',
      );
    }

    return account;
  }
}
