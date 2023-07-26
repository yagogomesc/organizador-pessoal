import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ZodError } from 'zod';

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: ZodError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    const statusCode = HttpStatus.BAD_REQUEST;
    const message = 'Erro de validação';
    const errors = exception.errors;

    response.status(statusCode).json({ statusCode, message, errors });
  }
}
