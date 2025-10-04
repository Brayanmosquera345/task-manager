import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
/**
 * Excepción de Dominio: El estado de la tarea solo debe ser PENDING, IN_PROGRESS o DONE.
 */
export class InvalidTaskStatusException extends DomainError {
  constructor(status: string) {
    super(
      `El estado de la tarea no es válido, solo puede ser PENDING, IN_PROGRESS o DONE: ${status}`,
      {
        status,
      },
    );
  }
}
