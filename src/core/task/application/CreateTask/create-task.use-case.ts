import { UuidGenerator } from '@/core/shared-domain/interfaces/uuid-generator';
import { Task } from '../../domain/entity/task.entity';
import { TaskRepository } from '../../domain/repository/task.repository';
import { EntityBase } from '@/core/shared-domain/entity/base.entity';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { TaskName } from '../../domain/entity/value-objects/task-name.ov';
import { TaskDescription } from '../../domain/entity/value-objects/task-description.ov';
import {
  TaskStatus,
  TaskStatusEnum,
} from '../../domain/entity/value-objects/task-status.ov';
import { TaskDueDate } from '../../domain/entity/value-objects/task-due-date.ov';
import { UserRepository } from '@/core/user/domain/repository/user.repository';
import { UserNotFoundException } from '@/core/user/domain/exceptions/user-not-found.exception';

export class CreateTaskUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private uuidGenerator: UuidGenerator,
    private userRepository: UserRepository,
  ) {}

  async execute(
    name: string,
    description: string,
    status: TaskStatusEnum,
    dueDate: Date,
    userId: string,
  ): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundException(userId);
    }
    const props = EntityBase.createNew();
    const newTask = new Task(
      new Uuid(this.uuidGenerator.generate()),
      new TaskName(name),
      new TaskDescription(description),
      new TaskStatus(status),
      new TaskDueDate(dueDate),
      new Uuid(user.id),
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
    );
    return await this.taskRepository.create(newTask);
  }
}
