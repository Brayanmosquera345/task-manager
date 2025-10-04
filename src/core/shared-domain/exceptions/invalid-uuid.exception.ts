import { DomainError } from './base.exeception';

export class InvalidUuidException extends DomainError {
  constructor(id: string) {
    super(`Invalid id: ${id}`, { id });
  }
}
