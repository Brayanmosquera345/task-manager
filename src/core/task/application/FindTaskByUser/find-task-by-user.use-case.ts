import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { Task } from '../../domain/entity/task.entity';
import { TaskRepository } from '../../domain/repository/task.repository';
import { TaskStatusEnum } from '../../domain/entity/value-objects/task-status.ov';

export class FindTaskByUserUseCase {
  constructor(private taskRepository: TaskRepository) {}

  async execute(
    userId: Uuid,
    status?: TaskStatusEnum,
    showDeleted?: boolean,
  ): Promise<Task[]> {
    return this.taskRepository.findByUserId(userId.value, status, showDeleted);
  }
}
