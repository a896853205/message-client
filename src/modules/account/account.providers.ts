import { Account } from './account.entity';

export const accountProviders = [
  {
    // TODO: this one should add into constants
    provide: 'ACCOUNT_REPOSITORY',
    useValue: Account,
  },
];
