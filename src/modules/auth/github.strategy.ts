import { Strategy } from 'passport-github2';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import axios from 'axios';

import { AccountService } from '../account/account.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {
    super(
      {
        clientID: process.env['GITHUB_CLIENT_ID'],
        clientSecret: process.env['GITHUB_CLIENT_SECRET'],
        callbackURL: 'http://localhost:3000/oauth',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const result = await axios({
            method: 'get',
            url: `https://api.github.com/user`,
            headers: {
              accept: 'application/json',
              Authorization: `token ${accessToken}`,
            },
          });

          // TODO: 一般accessToken存在数据库里，以后给前端访问github用户数据用
          const account = await this.accountService.findOneByGithubId(
            result.data.id,
          );

          if (account && account.isAuth === 1) {
            const payload = {
              name: account.name,
              avatarUrl: account.avatarUrl,
            };

            return done(null, { accessToken: this.jwtService.sign(payload) });
          }

          const {
            login,
            id: githubId,
            avatar_url: avatarUrl,
            name,
          } = result.data;
          await this.accountService.create(
            login,
            name,
            githubId,
            avatarUrl,
            accessToken,
          );

          return done(new UnauthorizedException('已注册，等待审核'));
        } catch (error) {
          // TODO: 500
          return done(new UnauthorizedException());
        }
      },
    );
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
