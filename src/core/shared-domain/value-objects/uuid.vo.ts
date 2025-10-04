import { InvalidUuidException } from '../exceptions/invalid-uuid.exception';
export class Uuid {
  value: string;
  constructor(value: string) {
    if (!this.isValid(value)) {
      throw new InvalidUuidException(value);
    }
    this.value = value;
  }

  private isValid(id: string) {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(id);
  }
}
