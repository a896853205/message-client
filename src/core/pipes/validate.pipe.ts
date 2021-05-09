import {
  Injectable,
  ValidationPipe,
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidationPipeOptions extends ValidationPipe {}
