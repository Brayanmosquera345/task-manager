import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
/**
 * Excepción de Dominio: El nombre de la tarea no es válido, debe tener entre 3 y 50 caracteres.
 */
export class InvalidTaskNameException extends DomainError {
  constructor(name: string) {
    super(
      `El nombre de la tarea no es válido debe tener entre 3 y 50 caracteres: ${name}`,
      {
        name,
      },
    );
  }
}
