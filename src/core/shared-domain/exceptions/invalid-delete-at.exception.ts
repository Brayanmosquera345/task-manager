import { DomainError } from './base.exeception';

export class InvalidDeleteAtException extends DomainError {
  constructor(value: Date | null) {
    super(
      `La fecha de eliminación no puede ser antes de la fecha de creación`,
      { value },
    );
  }
}
