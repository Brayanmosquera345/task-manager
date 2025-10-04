import { InvalidCreateAtException } from '../exceptions/invalid-create-at.exception';
export class CreatedAt {
  readonly value: Date;

  constructor(value: Date) {
    if (value > new Date()) {
      throw new InvalidCreateAtException(value);
    }
    this.value = value;
  }
}
