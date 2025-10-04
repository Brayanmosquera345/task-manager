import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
/**
 * Excepción de Dominio: Intento de crear un usuario que ya existe.
 */
export class UserAlreadyExistsError extends DomainError {
  constructor(email: string) {
    super(`El usuario con email '${email}' ya se encuentra registrado.`, {
      email,
    });
  }
}
