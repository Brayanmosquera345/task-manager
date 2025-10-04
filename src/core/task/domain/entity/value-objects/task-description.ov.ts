import { InvalidTaskDescriptionException } from '../../exceptions/invalid-task-description.exception';

export class TaskDescription {
  private _value: string;

  constructor(value: string) {
    this._value = value;
    this.ensureDescriptionIsValid();
  }

  get value(): string {
    return this._value;
  }

  private ensureDescriptionIsValid() {
    if (this.value.length < 3 || this.value.length > 500) {
      throw new InvalidTaskDescriptionException(this.value);
    }
  }
}
