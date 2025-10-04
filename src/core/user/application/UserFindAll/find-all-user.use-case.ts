import User from '../../domain/entity/user.entity';
import { UserRepository } from '../../domain/repository/user.repository';

export class FindAllUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
