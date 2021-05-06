import { Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import axios from 'axios';

import { AccountService } from '../account/account.service';
import { AuthService } from './auth.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      clientID: process.env['GITHUB_CLIENT_ID'],
      clientSecret: process.env['GITHUB_CLIENT_SECRET'],
      callbackURL: 'http://localhost:3000/oauth',
    });
  }

  async validate(accessToken: string) {
    const result = await axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`,
      },
    });

    const token = await this.authService.validateAccount(result.data.id);

    if (!token) {
      const { login, id: githubId, avatar_url: avatarUrl, name } = result.data;
      await this.accountService.create(
        login,
        name,
        githubId,
        avatarUrl,
        accessToken,
      );

      throw new UnauthorizedException('已注册，等待审核');
    }

    return token;
  }
}
