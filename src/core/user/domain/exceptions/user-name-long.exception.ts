import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
/**
 * Excepción de Dominio: Intento de crear un usuario con nombre demasiado corto o largo.
 */
export class UserNameTooLongError extends DomainError {
  constructor(name: string) {
    super(
      `El nombre del usuario debe tener al menos 3 caracteres y maximo 50.`,
      { name },
    );
  }
}
