import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { TaskStatusEnum } from '../../domain/entity/value-objects/task-status.ov';
import { TaskRepository } from '../../domain/repository/task.repository';
import { TaskNotFoundException } from '../../domain/exceptions/task-not-found.exception';

export class ChangeStatusTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: Uuid, status: TaskStatusEnum): Promise<void> {
    const task = await this.taskRepository.getTaskById(id.value);
    if (!task) {
      throw new TaskNotFoundException(id.value);
    }
    task.chageStatus(status);
    return await this.taskRepository.updateTask(id.value, task);
  }
}
