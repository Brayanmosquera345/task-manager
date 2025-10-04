import { InvalidTaskDueDateException } from '../../exceptions/invalid-task-due-date.exception';

export class TaskDueDate {
  private _value: Date;

  constructor(value: Date) {
    this._value = value;
    this.ensureDueDateIsValid();
  }

  get value(): Date {
    return this._value;
  }

  private ensureDueDateIsValid() {
    if (this.value.getTime() < Date.now()) {
      throw new InvalidTaskDueDateException(this.value);
    }
  }
}
