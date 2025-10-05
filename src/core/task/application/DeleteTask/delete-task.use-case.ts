import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { TaskAlreadyDeletedException } from '../../domain/exceptions/task-already-deleted.exception';
import { TaskRepository } from '../../domain/repository/task.repository';

export class DeleteTaskUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(id: Uuid): Promise<void> {
    const task = await this.taskRepository.getTaskById(id.value);
    if (task.deletedAt) {
      throw new TaskAlreadyDeletedException(task.id);
    }
    task.softDelete();
    return await this.taskRepository.updateTask(id.value, task);
  }
}
