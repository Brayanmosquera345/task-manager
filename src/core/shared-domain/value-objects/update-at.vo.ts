import { InvalidUpdateAtException } from '../exceptions/invalid-update-at.exception';

export class UpdatedAt {
  readonly value: Date;

  constructor(value: Date, createdAt: Date) {
    if (value < createdAt) {
      throw new InvalidUpdateAtException(value);
    }
    this.value = value;
  }
}
