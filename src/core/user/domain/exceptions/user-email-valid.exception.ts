import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';

/**
 * Excepción de Dominio: Intento de crear un usuario con email no válido.
 */
export class UserEmailNotValidError extends DomainError {
  constructor(email: string) {
    super(`El email '${email}' no es válido.`, { email });
  }
}
