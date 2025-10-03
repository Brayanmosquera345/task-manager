export default class UserName {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureNameIsValid();
  }

  private ensureNameIsValid() {
    if (this.value.length < 3) {
      throw new Error('Name must be at least 3 characters');
    }
  }
}
