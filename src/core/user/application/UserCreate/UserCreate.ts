import { UuidGenerator } from '@/core/shared-domain/interfaces/uuid-generator';
import User from '../../domain/entity/user.entity';
import UserEmail from '../../domain/entity/value-objects/user-email.vo';
import UserName from '../../domain/entity/value-objects/user-name.vo';
import { UserRepository } from '../../domain/repository/user.repository';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { EntityBase } from '@/core/shared-domain/entity/base.entity';

export default class UserCreate {
  constructor(
    private userRepository: UserRepository,
    private uuidGenerator: UuidGenerator,
  ) {}

  async execute(name: string, email: string): Promise<void> {
    const props = EntityBase.createNew();
    const user = new User(
      new Uuid(this.uuidGenerator.generate()),
      new UserName(name),
      new UserEmail(email),
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
    );
    return this.userRepository.create(user);
  }
}
