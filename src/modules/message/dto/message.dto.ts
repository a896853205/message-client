import { MaxLength, IsInt, IsIn, IsString } from 'class-validator';
import { PartialType, OmitType, PickType } from '@nestjs/swagger';

export class MessageDto {
  @IsInt()
  id: number;

  @IsString()
  @MaxLength(36, {
    message: 'uuid is to long',
  })
  uuid: string;

  @IsString()
  @MaxLength(255, {
    message: 'message is too long',
  })
  message: string;

  @IsString()
  @MaxLength(6, {
    message: 'code is too long',
  })
  code: string;

  @IsString()
  @IsIn(['success', 'information', 'error', 'alter', 'unknown', ''])
  type: string;

  @IsInt()
  page: number;
}
export class CreateMessageDto extends OmitType(MessageDto, ['page'] as const) {}
export class UpdateMessageDto extends PickType(MessageDto, [
  'id',
  'message',
] as const) {}
export class DeleteMessageDto extends PickType(MessageDto, ['id'] as const) {}
export class SearchMessageDto extends PartialType(
  OmitType(MessageDto, ['id', 'uuid'] as const),
) {}
