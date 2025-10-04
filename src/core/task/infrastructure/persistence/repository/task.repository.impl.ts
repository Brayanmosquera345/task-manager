import { TaskRepository } from '@/core/task/domain/repository/task.repository';
import { Task } from '@/core/task/domain/entity/task.entity';
import TaskOrmEntity from '../entity/task-orm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { InvalidTaskUserIdException } from '@/core/task/domain/exceptions/invalid-task-user-id.exception';

interface PostgresError extends QueryFailedError {
  code: string;
  detail: string;
  constraint: string;
}

export class TaskRepositoryImpl implements TaskRepository {
  constructor(
    @InjectRepository(TaskOrmEntity)
    private readonly repository: Repository<TaskOrmEntity>,
  ) {}

  async create(task: Task): Promise<void> {
    const taskOrmEntity = {
      id: task.id,
      name: task.name.value,
      description: task.description.value,
      status: task.status.value,
      dueDate: task.dueDate.value,
      userId: task.userId.value,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      deletedAt: task.deletedAt,
    };
    try {
      await this.repository.save(taskOrmEntity);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        const postgresError = e as PostgresError;
        if (postgresError.code === '23503') {
          throw new InvalidTaskUserIdException(task.userId.value);
        }
      }
      throw e;
    }
  }
}
