import { EntityBase } from '@/core/shared-domain/entity/base.entity';
import { CreatedAt } from '@/core/shared-domain/value-objects/create-at.vo';
import { DeletedAt } from '@/core/shared-domain/value-objects/delete-at.vo';
import { UpdatedAt } from '@/core/shared-domain/value-objects/update-at.vo';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { TaskStatus, TaskStatusEnum } from './value-objects/task-status.ov';
import { TaskName } from './value-objects/task-name.ov';
import { TaskDescription } from './value-objects/task-description.ov';
import { TaskDueDate } from './value-objects/task-due-date.ov';
import { TaskStatusAlreadyStatusException } from '../exceptions/task-already-status.exception';

interface TaskReconstitutionProps {
  id: Uuid;
  name: TaskName;
  description: TaskDescription;
  status: TaskStatus;
  dueDate: TaskDueDate;
  userId: Uuid;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  deletedAt: DeletedAt;
}

export class Task extends EntityBase {
  private _name: TaskName;
  private _description: TaskDescription;
  private _status: TaskStatus;
  private _dueDate: TaskDueDate;
  private _userId: Uuid;

  constructor(
    id: Uuid,
    name: TaskName,
    description: TaskDescription,
    status: TaskStatus,
    dueDate: TaskDueDate,
    userId: Uuid,
    createAt: CreatedAt,
    updatedAt: UpdatedAt,
    deletedAt: DeletedAt,
  ) {
    super(id, createAt, updatedAt, deletedAt);
    this._name = name;
    this._description = description;
    this._status = status;
    this._dueDate = dueDate;
    this._userId = userId;
  }

  static reconstitute(props: TaskReconstitutionProps): Task {
    return new Task(
      props.id,
      props.name,
      props.description,
      props.status,
      props.dueDate,
      props.userId,
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
    );
  }

  get name(): TaskName {
    return this._name;
  }

  get description(): TaskDescription {
    return this._description;
  }

  get status(): TaskStatus {
    return this._status;
  }

  get dueDate(): TaskDueDate {
    return this._dueDate;
  }

  get userId(): Uuid {
    return this._userId;
  }

  chageStatus(status: TaskStatusEnum): void {
    if (this._status.value === status) {
      throw new TaskStatusAlreadyStatusException(status);
    }
    this._status = new TaskStatus(status);
  }
}
