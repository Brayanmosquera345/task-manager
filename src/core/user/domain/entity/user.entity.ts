import UserName from './value-objects/user-name.vo';
import UserEmail from './value-objects/user-email.vo';
import { EntityBase } from '@/core/shared-domain/entity/base.entity';
import { Uuid } from '@/core/shared-domain/value-objects/uuid.vo';

export default class User extends EntityBase {
  private _name: UserName;
  private _email: UserEmail;

  constructor(id: Uuid, name: UserName, email: UserEmail) {
    super(id);
    this._name = name;
    this._email = email;
  }

  get name(): UserName {
    return this._name;
  }

  get email(): UserEmail {
    return this._email;
  }
}
