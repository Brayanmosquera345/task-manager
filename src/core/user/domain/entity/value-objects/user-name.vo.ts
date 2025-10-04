import { UserNameTooLongError } from '../../exceptions/user-name-long.exception';

export default class UserName {
  value: string;

  constructor(value: string) {
    this.value = value;
    this.ensureNameIsValid();
  }

  private ensureNameIsValid() {
    if (this.value.length < 3 || this.value.length > 50) {
      throw new UserNameTooLongError(this.value);
    }
  }
}
