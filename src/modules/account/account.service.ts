import { Injectable, Inject } from '@nestjs/common';
import { v4 } from 'uuid';

import { Account } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @Inject('ACCOUNT_REPOSITORY')
    private readonly accountRepository: typeof Account,
  ) {}

  async findOneByGithubId(githubId: number): Promise<Account | null> {
    return await this.accountRepository.findOne<Account | null>({
      where: { githubId },
    });
  }

  async create(
    login: string,
    name: string,
    githubId: number,
    avatarUrl: string,
    accessToken: string,
  ): Promise<Account> {
    return await this.accountRepository.create({
      uuid: v4(),
      login,
      name,
      githubId,
      avatarUrl,
      isAuth: 0,
      accessToken,
    });
  }
}
