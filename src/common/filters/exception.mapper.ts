import { HttpException, HttpStatus } from '@nestjs/common';
import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
import { UserAlreadyExistsError } from '@/core/user/domain/exceptions/user-already-exists.exception';
import { UserNameTooLongError } from '@/core/user/domain/exceptions/user-name-long.exception';
import { UserEmailNotValidError } from '@/core/user/domain/exceptions/user-email-valid.exception';
import { InvalidTaskNameException } from '@/core/task/domain/exceptions/invalid-task-name.exception';
import { InvalidTaskDescriptionException } from '@/core/task/domain/exceptions/invalid-task-description.exception';
import { InvalidTaskDueDateException } from '@/core/task/domain/exceptions/invalid-task-due-date.exception';
import { InvalidTaskUserIdException } from '@/core/task/domain/exceptions/invalid-task-user-id.exception';
import { InvalidTaskStatusException } from '@/core/task/domain/exceptions/invalid-task-status.exception';
import { InvalidCreateAtException } from '@/core/shared-domain/exceptions/invalid-create-at.exception';
import { InvalidUpdateAtException } from '@/core/shared-domain/exceptions/invalid-update-at.exception';
import { InvalidDeleteAtException } from '@/core/shared-domain/exceptions/invalid-delete-at.exception';
import { InvalidUuidException } from '@/core/shared-domain/exceptions/invalid-uuid.exception';
import { TaskNotFoundException } from '@/core/task/domain/exceptions/task-not-found.exception';
import { TaskAlreadyDeletedException } from '@/core/task/domain/exceptions/task-already-deleted.exception';
import { TaskStatusAlreadyStatusException } from '@/core/task/domain/exceptions/task-already-status.exception';

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
  } else if (exception instanceof InvalidTaskNameException) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof InvalidTaskDescriptionException) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof InvalidTaskDueDateException) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof InvalidTaskUserIdException) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof InvalidTaskStatusException) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof InvalidCreateAtException) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof InvalidUpdateAtException) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof InvalidDeleteAtException) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof InvalidUuidException) {
    httpStatus = HttpStatus.BAD_REQUEST;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof TaskNotFoundException) {
    httpStatus = HttpStatus.NOT_FOUND;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof TaskAlreadyDeletedException) {
    httpStatus = HttpStatus.CONFLICT;
    responseBody = {
      statusCode: httpStatus,
      message: exception.message,
      data: exception.data,
    };
  } else if (exception instanceof TaskStatusAlreadyStatusException) {
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
