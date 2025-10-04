import { DomainError } from './base.exeception';

export class InvalidCreateAtException extends DomainError {
  constructor(value: Date) {
    super(`La fecha de creación no puede ser despues de la fecha actual`, {
      value,
    });
  }
}
