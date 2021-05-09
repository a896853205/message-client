import { MaxLength, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
enum Type {
  'information',
  'success',
  'alter',
  'error',
}
export class MessageDto {
  @IsNotEmpty()
  @MaxLength(255, {
    message: 'message is too long',
  })
  message?: string;
  @IsNotEmpty()
  @MaxLength(6, {
    message: 'key is too long',
  })
  code?: string;
  @IsNotEmpty()
  @IsEnum(Type, {
    message: 'type must be one of information or success or alter or error',
  })
  type?: string;
  @IsNotEmpty()
  @IsNumber()
  page?: number;
}
