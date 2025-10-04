import { InvalidTaskStatusException } from '../../exceptions/invalid-task-status.exception';

export type TaskStatusType = 'PENDING' | 'IN_PROGRESS' | 'DONE';

export enum TaskStatusEnum {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TaskStatus {
  private _value: TaskStatusEnum;

  constructor(value: TaskStatusEnum) {
    this._value = value;
    this.ensureStatusIsValid();
  }

  get value(): TaskStatusType {
    return this._value;
  }
  private ensureStatusIsValid() {
    if (!Object.values(TaskStatusEnum).includes(this._value)) {
      throw new InvalidTaskStatusException(this._value);
    }
  }
}
