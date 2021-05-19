import { MaxLength, IsInt, IsIn, IsString } from 'class-validator';
import { PartialType, OmitType, PickType, ApiProperty } from '@nestjs/swagger';

export class MessageDto {
  @IsInt()
  @ApiProperty()
  id: number;

  @IsString()
  @MaxLength(36, {
    message: 'uuid is to long',
  })
  @ApiProperty()
  uuid: string;

  @IsString()
  @MaxLength(255, {
    message: 'message is too long',
  })
  @ApiProperty()
  message: string;

  @IsString()
  @MaxLength(6, {
    message: 'code is too long',
  })
  @ApiProperty()
  code: string;

  @IsString()
  @IsIn(['success', 'information', 'error', 'alter', 'unknown', ''])
  @ApiProperty()
  type: string;

  @IsInt()
  @ApiProperty()
  page: number;
}
export class CreateMessageDto extends OmitType(MessageDto, [
  'page',
  'id',
  'uuid',
] as const) {}
export class UpdateMessageDto extends PickType(MessageDto, [
  'id',
  'message',
] as const) {}
export class DeleteMessageDto extends PickType(MessageDto, ['id'] as const) {}
export class SearchMessageDto extends PartialType(
  OmitType(MessageDto, ['id', 'uuid'] as const),
) {}
