import User from '@/core/user/domain/entity/user.entity';
import { UserRepository } from '@/core/user/domain/repository/user.repository';
import UserOrmEntity from '../entity/user-orm.entyti';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { UserAlreadyExistsError } from '@/core/user/domain/exceptions/user-already-exists.exception';
import UserName from '@/core/user/domain/entity/value-objects/user-name.vo';
import UserEmail from '@/core/user/domain/entity/value-objects/user-email.vo';
import { CreatedAt } from '@/core/shared-domain/value-objects/create-at.vo';
import { UpdatedAt } from '@/core/shared-domain/value-objects/update-at.vo';
import { DeletedAt } from '@/core/shared-domain/value-objects/delete-at.vo';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';

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

  async findAll(): Promise<User[]> {
    const listUsersOrm = await this.repository.find();
    return listUsersOrm.map((orm) => this.toDomain(orm));
  }

  private toDomain(orm: UserOrmEntity): User {
    return User.reconstitute({
      id: new Uuid(orm.id),
      name: new UserName(orm.name),
      email: new UserEmail(orm.email),
      createdAt: new CreatedAt(orm.createdAt),
      updatedAt: new UpdatedAt(orm.updatedAt, orm.createdAt),
      deletedAt: new DeletedAt(orm.deletedAt, orm.createdAt),
    });
  }
}
