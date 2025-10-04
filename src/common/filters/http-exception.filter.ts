import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
import { mapDomainErrorToHttp } from './exception.mapper';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let httpException: HttpException;

    // 1. Si es un error de DOMINIO, lo mapeamos a una HttpException
    if (exception instanceof DomainError) {
      httpException = mapDomainErrorToHttp(exception);
    }
    // 2. Si ya es una HttpException (ej. NotFoundException de NestJS), la usamos directamente
    else if (exception instanceof HttpException) {
      httpException = exception;
    }
    // 3. Si es un error desconocido (Error nativo, etc.), creamos un Internal Server Error
    else {
      // Opcional: Loguear el error desconocido: console.error(exception);
      httpException = new HttpException(
        'Internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const status = httpException.getStatus();
    const responseBody = httpException.getResponse();

    const finalResponse =
      typeof responseBody === 'string'
        ? {
            success: false,
            statusCode: status,
            message: responseBody,
          }
        : {
            success: false,
            statusCode: status,
            ...(responseBody as Record<string, any>),
          };

    response.status(status).json({
      ...finalResponse,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
