export class DeletedAt {
  readonly value: Date | null;

  constructor(value: Date | null, createdAt: Date) {
    if (value && value < createdAt) {
      throw new Error('DeletedAt cannot be before CreatedAt');
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
