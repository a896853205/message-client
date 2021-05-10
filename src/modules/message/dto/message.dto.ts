import { MaxLength, IsNumberString, IsEnum, IsNumber } from 'class-validator';
enum Type {
  infromation = 'information',
  success = 'success',
  alter = 'alter',
  error = 'error',
}
export class MessageDto {
  @IsNumber()
  id?: number;
  
  @MaxLength(255, {
    message: 'message is too long',
  })
  message?: string;

  @MaxLength(6, {
    message: 'key is too long',
  })
  code?: string;

  @IsEnum(Type, {
    message: 'type must be one of information or success or alter or error',
  })
  type?: string;

  @IsNumberString()
  page?: number;
}
