import { Module } from '@nestjs/common';
import UserCreate from '../application/UserCreate/UserCreate';
import { CryptoUuidGenerator } from '@/core/shared-infrastructure/uuid/crypto-uuid-generator';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserRepositoryImpl from './persistence/repository/user.repository.impl';
import UserOrmEntity from './persistence/entity/user-orm.entyti';
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
  ],
})
export class UserModule {}
