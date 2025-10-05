import { Module } from '@nestjs/common';
import UserCreate from '../application/UserCreate/UserCreate';
import { FindAllUserUseCase } from '../application/UserFindAll/find-all-user.use-case';
import { CryptoUuidGenerator } from '@/core/shared-infrastructure/uuid/crypto-uuid-generator';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepositoryImpl from './persistence/repository/user.repository.impl';
import UserOrmEntity from './persistence/entity/user-orm.entity';
import UserController from './http/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
    CryptoUuidGenerator,
    {
      provide: 'UserCreate',
      useFactory: (
        repository: UserRepositoryImpl,
        uuidGenerator: CryptoUuidGenerator,
      ) => new UserCreate(repository, uuidGenerator),
      inject: ['UserRepository', CryptoUuidGenerator],
    },
    {
      provide: 'FindAllUserUseCase',
      useFactory: (repository: UserRepositoryImpl) =>
        new FindAllUserUseCase(repository),
      inject: ['UserRepository'],
    },
  ],
})
export class UserModule {}
