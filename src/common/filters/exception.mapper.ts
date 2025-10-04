import { HttpException, HttpStatus } from '@nestjs/common';
import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
import { UserAlreadyExistsError } from '@/core/user/domain/exceptions/user-already-exists.exception';
import { UserNameTooLongError } from '@/core/user/domain/exceptions/user-name-long.exception';
import { UserEmailNotValidError } from '@/core/user/domain/exceptions/user-email-valid.exception';

/**
 * Interfaz para la respuesta HTTP que enviamos al cliente.
 * Se alinea con el formato de tu AllExceptionsFilter.
 */
interface ErrorResponse {
  statusCode: HttpStatus;
  message: string;
  data?: Record<string, any>;
}

/**
 * Función que mapea una excepción de Dominio a una respuesta HTTP (o a una HttpException).
 */
export const mapDomainErrorToHttp = (exception: DomainError): HttpException => {
  let httpStatus: HttpStatus;
  let responseBody: Partial<ErrorResponse>;

  if (exception instanceof UserAlreadyExistsError) {
    httpStatus = HttpStatus.CONFLICT;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof UserNameTooLongError) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof UserEmailNotValidError) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else {
    // Si la excepción de Dominio no está mapeada, se usa un error genérico
    httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    responseBody = {
      statusCode: httpStatus,
      message: 'Ocurrió un error interno no manejado.',
    };
  }

  // Lanzamos una HttpException de NestJS con el cuerpo formateado
  return new HttpException(responseBody, httpStatus);
};
