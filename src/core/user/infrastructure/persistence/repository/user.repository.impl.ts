import User from '@/core/user/domain/entity/user.entity';
import { UserRepository } from '@/core/user/domain/repository/user.repository';
import UserOrmEntity from '../entity/user-orm.entyti';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserAlreadyExistsError } from '@/core/user/domain/exceptions/user-already-exists.exception';

interface PostgresError extends QueryFailedError {
  code: string;
  detail: string;
  constraint: string;
}

export default class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<void> {
    try {
      await this.repository.save({
        id: user.id,
        name: user.name.value,
        email: user.email.value,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      });
    } catch (error) {
      if (error instanceof QueryFailedError) {
        const postgresError = error as PostgresError;
        if (postgresError.code === '23505') {
          throw new UserAlreadyExistsError(user.email.value);
        }
      }
      throw error;
    }
  }
}
