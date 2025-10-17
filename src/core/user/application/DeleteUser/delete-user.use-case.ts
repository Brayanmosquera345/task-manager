import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { UserRepository } from '../../domain/repository/user.repository';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: Uuid): Promise<void> {
    const user = await this.userRepository.findById(id.value);
    if (!user) {
      throw new UserNotFoundException(id.value);
    }
    user.softDelete();
    return await this.userRepository.update(id.value, user);
  }
}
