import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';

export class TaskNotFoundException extends DomainError {
  constructor(id: string) {
    super(`La tarea con id: ${id} no se ha encontrado.`, {
      id,
    });
  }
}
