export class CreatedAt {
  readonly value: Date;

  constructor(value: Date) {
    if (value > new Date()) {
      throw new Error('CreatedAt must be in the past');
    }
    this.value = value;
  }
}
