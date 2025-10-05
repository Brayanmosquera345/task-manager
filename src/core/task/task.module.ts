import { Module } from '@nestjs/common';
import { TaskRepositoryImpl } from './infrastructure/persistence/repository/task.repository.impl';
import { CryptoUuidGenerator } from '@/core/shared-infrastructure/uuid/crypto-uuid-generator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateTaskUseCase } from './application/CreateTask/create-task.use-case';
import { FindTaskByUserUseCase } from './application/FindTaskByUser/find-task-by-user.use-case';
import TaskController from './infrastructure/http/controller/task.controller';
import TaskOrmEntity from './infrastructure/persistence/entity/task-orm.entity';
import UserOrmEntity from '../user/infrastructure/persistence/entity/user-orm.entyti';
import { DeleteTaskUseCase } from './application/DeleteTask/delete-task.use-case';
import { ChangeStatusTaskUseCase } from './application/ChangeStatusTask/change-status-task.use-case';
import UserRepositoryImpl from '../user/infrastructure/persistence/repository/user.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([TaskOrmEntity, UserOrmEntity])],
  controllers: [TaskController],
  providers: [
    TaskRepositoryImpl,
    UserRepositoryImpl,
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
        userRepository: UserRepositoryImpl,
      ) => new CreateTaskUseCase(repository, uuidGenerator, userRepository),
      inject: ['TaskRepository', CryptoUuidGenerator, UserRepositoryImpl],
    },
    {
      provide: 'FindTaskByUserUseCase',
      useFactory: (
        repository: TaskRepositoryImpl,
        userRepository: UserRepositoryImpl,
      ) => new FindTaskByUserUseCase(repository, userRepository),
      inject: ['TaskRepository', UserRepositoryImpl],
    },
    {
      provide: 'DeleteTaskUseCase',
      useFactory: (repository: TaskRepositoryImpl) =>
        new DeleteTaskUseCase(repository),
      inject: ['TaskRepository'],
    },
    {
      provide: 'ChangeStatusTaskUseCase',
      useFactory: (repository: TaskRepositoryImpl) =>
        new ChangeStatusTaskUseCase(repository),
      inject: ['TaskRepository'],
    },
  ],
})
export class TaskModule {}
