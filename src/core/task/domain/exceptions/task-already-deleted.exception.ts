import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';

export class TaskAlreadyDeletedException extends DomainError {
  constructor(id: string) {
    super(`La tarea con id: ${id} ya fue eliminada.`, {
      id,
    });
  }
}
