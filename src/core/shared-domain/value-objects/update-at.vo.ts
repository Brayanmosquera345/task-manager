export class UpdatedAt {
  readonly value: Date;

  constructor(value: Date, createdAt: Date) {
    if (value < createdAt) {
      throw new Error('UpdatedAt cannot be before CreatedAt');
    }
    this.value = value;
  }
}
