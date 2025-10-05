import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { Task } from '../../domain/entity/task.entity';
import { TaskRepository } from '../../domain/repository/task.repository';
import { TaskStatusEnum } from '../../domain/entity/value-objects/task-status.ov';
import { UserRepository } from '@/core/user/domain/repository/user.repository';
import { UserNotFoundException } from '@/core/user/domain/exceptions/user-not-found.exception';

export class FindTaskByUserUseCase {
  constructor(
    private taskRepository: TaskRepository,
    private userRepository: UserRepository,
  ) {}

  async execute(
    userId: Uuid,
    status?: TaskStatusEnum,
    showDeleted?: boolean,
  ): Promise<Task[]> {
    const user = await this.userRepository.findById(userId.value);
    if (!user) {
      throw new UserNotFoundException(userId.value);
    }
    return this.taskRepository.findByUserId(userId.value, status, showDeleted);
  }
}
