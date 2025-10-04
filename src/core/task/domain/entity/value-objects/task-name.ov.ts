import { InvalidTaskNameException } from '../../exceptions/invalid-task-name.exception';
export class TaskName {
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.ensureNameIsValid();
  }

  get value(): string {
    return this._value;
  }

  private ensureNameIsValid() {
    if (this.value.length < 3 || this.value.length > 50) {
      throw new InvalidTaskNameException(this.value);
    }
  }
}
