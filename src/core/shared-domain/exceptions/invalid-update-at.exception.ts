import { DomainError } from './base.exeception';

export class InvalidUpdateAtException extends DomainError {
  constructor(value: Date) {
    super(
      `La fecha de actualización no puede ser antes de la fecha de creación`,
      {
        value,
      },
    );
  }
}
