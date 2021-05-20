import { Injectable, Inject } from '@nestjs/common';
import { v4 } from 'uuid';
import { Op } from 'sequelize';

import { Account, SafeAccount } from './account.entity';
import { PAGE } from '../../core/constants/index';
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

  async findOneById(id: number): Promise<Account | null> {
    return await this.accountRepository.findOne<Account | null>({
      where: { id },
    });
  }

  /**
   * 返回不带有敏感信息的account
   * @param id 账号id
   */
  async findSafeOneById(id: number): Promise<SafeAccount | null> {
    const account = await this.accountRepository.findOne<Account | null>({
      where: { id },
    });

    return account ? new SafeAccount(account) : null;
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

  async account(name: string, isAuth: number, page: number) {
    return await this.accountRepository.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
        isAuth,
      },
      offset: (page - 1) * 5,
      limit: PAGE,
    });
  }
}
