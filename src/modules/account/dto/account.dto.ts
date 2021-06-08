import { IsInt, IsString, MaxLength, IsIn } from 'class-validator';
import { PartialType, PickType } from '@nestjs/swagger';
import { Account } from '../account.entity';

export class AccountDto {
  @IsInt()
  id: number;

  @IsString()
  @MaxLength(36, {
    message: 'uuid is to long',
  })
  uuid: string;

  @IsString()
  name: string;

  @IsString()
  avatarUrl: string;

  @IsString()
  login: string;

  @IsInt()
  githubId: number;

  @IsInt()
  @IsIn([0, 1])
  isAuth: number;

  @IsString()
  accessToken: string;

  @IsInt()
  page: number;
}

export class SearchAccountDto extends PartialType(
  PickType(AccountDto, ['page', 'isAuth', 'name'] as const),
) {}

export class PutIsAuthAccountDto extends PartialType(
  PickType(AccountDto, ['uuid', 'isAuth'] as const),
) {}
