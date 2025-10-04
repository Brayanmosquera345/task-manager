import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';
/**
 * Excepción de Dominio: Intento de crear una tarea con un id de usuario no que no existe.
 */
export class InvalidTaskUserIdException extends DomainError {
  constructor(userId: string) {
    super(`Usuario invalido: ${userId}`, {
      userId,
    });
  }
}
