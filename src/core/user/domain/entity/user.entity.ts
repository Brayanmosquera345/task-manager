import UserName from './value-objects/user-name.vo';
import UserEmail from './value-objects/user-email.vo';
import { EntityBase } from '@/core/shared-domain/entity/base.entity';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';
import { CreatedAt } from '@/core/shared-domain/value-objects/create-at.vo';
import { UpdatedAt } from '@/core/shared-domain/value-objects/update-at.vo';
import { DeletedAt } from '@/core/shared-domain/value-objects/delete-at.vo';

interface UserReconstitutionProps {
  id: Uuid;
  name: UserName;
  email: UserEmail;
  createdAt: CreatedAt;
  updatedAt: UpdatedAt;
  deletedAt: DeletedAt;
}

export default class User extends EntityBase {
  private _name: UserName;
  private _email: UserEmail;

  constructor(
    id: Uuid,
    name: UserName,
    email: UserEmail,
    createdAt: CreatedAt,
    updatedAt: UpdatedAt,
    deletedAt: DeletedAt,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = name;
    this._email = email;
  }

  static reconstitute(props: UserReconstitutionProps): User {
    return new User(
      props.id,
      props.name,
      props.email,
      props.createdAt,
      props.updatedAt,
      props.deletedAt,
    );
  }

  get name(): UserName {
    return this._name;
  }

  get email(): UserEmail {
    return this._email;
  }
}
