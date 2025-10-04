import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
/**
 * Excepción de Dominio: La fecha de vencimiento de la tarea no es válida debe ser mayor a la fecha actual.
 */
export class InvalidTaskDueDateException extends DomainError {
  constructor(dueDate: Date) {
    super(
      `La fecha de vencimiento de la tarea no es válida debe ser mayor a la fecha actual: ${dueDate.toDateString()}`,
      {
        dueDate,
      },
    );
  }
}
