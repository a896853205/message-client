import { IsInt, IsString, MaxLength, IsIn } from 'class-validator';
import { OmitType, PartialType, PickType } from '@nestjs/swagger';

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
