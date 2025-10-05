import { Module } from '@nestjs/common';
import { TaskRepositoryImpl } from './infrastructure/persistence/repository/task.repository.impl';
import { CryptoUuidGenerator } from '@/core/shared-infrastructure/uuid/crypto-uuid-generator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskUseCase } from './application/CreateTask/create-task.use-case';
import { FindTaskByUserUseCase } from './application/FindTaskByUser/find-task-by-user.use-case';
import TaskController from './infrastructure/http/controller/task.controller';
import TaskOrmEntity from './infrastructure/persistence/entity/task-orm.entity';
import { DeleteTaskUseCase } from './application/DeleteTask/delete-task.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity])],
  controllers: [TaskController],
  providers: [
    TaskRepositoryImpl,
    {
      provide: 'TaskRepository',
      useClass: TaskRepositoryImpl,
    },
    CryptoUuidGenerator,
    {
      provide: 'CreateTaskUseCase',
      useFactory: (
        repository: TaskRepositoryImpl,
        uuidGenerator: CryptoUuidGenerator,
      ) => new CreateTaskUseCase(repository, uuidGenerator),
      inject: ['TaskRepository', CryptoUuidGenerator],
    },
    {
      provide: 'FindTaskByUserUseCase',
      useFactory: (repository: TaskRepositoryImpl) =>
        new FindTaskByUserUseCase(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'DeleteTaskUseCase',
      useFactory: (repository: TaskRepositoryImpl) =>
        new DeleteTaskUseCase(repository),
      inject: ['TaskRepository'],
    },
  ],
})
export class TaskModule {}
