import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';

export class TaskStatusAlreadyStatusException extends DomainError {
  constructor(status: string) {
    super(`El estado de la tarea ya es: ${status}`, {
      status,
    });
  }
}
