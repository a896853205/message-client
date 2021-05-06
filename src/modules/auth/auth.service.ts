import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { AccountService } from '../account/account.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 根据githubId，生成本系统自身的token
   * @param githubId github账号的id
   * @returns 带有自身系统的token，属性为accessToken
   */
  async validateAccount(githubId: number) {
    // find if user exist with this email
    const account = await this.accountService.findOneByGithubId(githubId);

    if (!account) {
      return null;
    }
    if (account.isAuth === 0) {
      return null;
    }

    const payload = {
      id: account.id,
      name: account.name,
      avatarUrl: account.avatarUrl,
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
