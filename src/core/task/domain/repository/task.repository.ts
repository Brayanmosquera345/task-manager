import { Task } from '../entity/task.entity';
import { TaskStatusEnum } from '../entity/value-objects/task-status.ov';

export interface TaskRepository {
  create(task: Task): Promise<void>;
  findByUserId(
    userId: string,
    status?: TaskStatusEnum,
    showDeleted?: boolean,
  ): Promise<Task[]>;
}
