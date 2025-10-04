import { Task } from '../entity/task.entity';

export interface TaskRepository {
  create(task: Task): Promise<void>;
}
