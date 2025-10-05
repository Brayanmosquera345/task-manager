import { TaskRepository } from '@/core/task/domain/repository/task.repository';
import { Task } from '@/core/task/domain/entity/task.entity';
import TaskOrmEntity from '../entity/task-orm.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { InvalidTaskUserIdException } from '@/core/task/domain/exceptions/invalid-task-user-id.exception';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { TaskName } from '@/core/task/domain/entity/value-objects/task-name.ov';
import { TaskDescription } from '@/core/task/domain/entity/value-objects/task-description.ov';
import {
  TaskStatus,
  TaskStatusEnum,
} from '@/core/task/domain/entity/value-objects/task-status.ov';
import { TaskDueDate } from '@/core/task/domain/entity/value-objects/task-due-date.ov';
import { CreatedAt } from '@/core/shared-domain/value-objects/create-at.vo';
import { UpdatedAt } from '@/core/shared-domain/value-objects/update-at.vo';
import { DeletedAt } from '@/core/shared-domain/value-objects/delete-at.vo';
import { TaskNotFoundException } from '@/core/task/domain/exceptions/task-not-found.exception';

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

  async findByUserId(
    userId: string,
    status?: TaskStatusEnum,
    showDeleted?: boolean,
  ): Promise<Task[]> {
    const queryBuilder = this.repository.createQueryBuilder('tasks');
    queryBuilder.where('tasks.userId = :userId', { userId });

    if (status) {
      queryBuilder.andWhere('tasks.status = :status', { status });
    }
    if (showDeleted) {
      queryBuilder.withDeleted();
    }

    const listTasksOrm = await queryBuilder.getMany();

    return listTasksOrm.map((orm) => this.toDomain(orm));
  }

  async updateTask(id: string, task: Task): Promise<void> {
    const taskOrmEntity = {
      id,
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
        if (postgresError.code === '23505') {
          throw new TaskNotFoundException(id);
        }
      }
      throw e;
    }
  }

  async getTaskById(id: string): Promise<Task> {
    const taskOrm = await this.repository.findOne({ where: { id } });
    if (!taskOrm) {
      throw new TaskNotFoundException(id);
    }
    return this.toDomain(taskOrm);
  }

  private toDomain(orm: TaskOrmEntity): Task {
    return Task.reconstitute({
      id: new Uuid(orm.id),
      name: new TaskName(orm.name),
      description: new TaskDescription(orm.description),
      status: new TaskStatus(orm.status),
      dueDate: new TaskDueDate(orm.dueDate),
      userId: new Uuid(orm.userId),
      createdAt: new CreatedAt(orm.createdAt),
      updatedAt: new UpdatedAt(orm.updatedAt, orm.createdAt),
      deletedAt: new DeletedAt(orm.deletedAt, orm.createdAt),
    });
  }
}
