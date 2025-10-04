import { InvalidDeleteAtException } from '../exceptions/invalid-delete-at.exception';
export class DeletedAt {
  readonly value: Date | null;

  constructor(value: Date | null, createdAt: Date) {
    if (value && value < createdAt) {
      throw new InvalidDeleteAtException(value);
    }
    this.value = value;
  }

  isDeleted(): boolean {
    return this.value !== null;
  }

  static none(createdAt: Date): DeletedAt {
    return new DeletedAt(null, createdAt);
  }
}
