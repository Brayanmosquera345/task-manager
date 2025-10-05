import { DomainError } from '@/core/shared-domain/exceptions/base.exeception';

export class UserNotFoundException extends DomainError {
  constructor(id: string) {
    super(`No se ha encontrado el usuario con id: ${id}`, { id });
  }
}
