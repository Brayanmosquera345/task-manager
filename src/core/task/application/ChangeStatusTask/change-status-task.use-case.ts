import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { TaskStatusEnum } from '../../domain/entity/value-objects/task-status.ov';
import { TaskRepository } from '../../domain/repository/task.repository';

export class ChangeStatusTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: Uuid, status: TaskStatusEnum): Promise<void> {
    const task = await this.taskRepository.getTaskById(id.value);
    task.chageStatus(status);
    return await this.taskRepository.updateTask(id.value, task);
  }
}
