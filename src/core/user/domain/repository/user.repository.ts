import User from '../entity/user.entity';

export interface UserRepository {
  create(user: User): Promise<void>;
}
