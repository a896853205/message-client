import { MaxLength, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, PartialType, OmitType, PickType } from '@nestjs/swagger';
export class MessageDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  id: number;

  @ApiProperty()
  @MaxLength(36, {
    message: 'uuid is to long',
  })
  uuid: string;

  @ApiProperty()
  @MaxLength(255, {
    message: 'message is too long',
  })
  message: string;

  @ApiProperty()
  @MaxLength(6, {
    message: 'code is too long',
  })
  code: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  page: number;
}
export class CreateMessageDto extends OmitType(MessageDto, ['page'] as const) {}
export class UpdateMessageDto extends PickType(MessageDto, [
  'id',
  'message',
] as const) {}
export class DeleteMessageDto extends PickType(MessageDto, ['id'] as const) {}
export class SearchMessageDto extends PartialType(MessageDto) {}
