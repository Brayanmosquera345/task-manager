import User from '@/core/user/domain/entity/user.entity';
import { UserRepository } from '@/core/user/domain/repository/user.repository';
import UserOrmEntity from '../entity/user-orm.entyti';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export default class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repository: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<void> {
    await this.repository.save({
      id: user.id,
      name: user.name.value,
      email: user.email.value,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });
  }
}
