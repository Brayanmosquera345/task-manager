import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
/**
 * Excepción de Dominio: La descripción de la tarea no es válida.
 */
export class InvalidTaskDescriptionException extends DomainError {
  constructor(description: string) {
    super(
      `La descripción de la tarea no es válida debe tener entre 3 y 500 caracteres: ${description}`,
      {
        description,
      },
    );
  }
}
