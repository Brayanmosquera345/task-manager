import { UserEmailNotValidError } from '../../exceptions/user-email-valid.exception';
export default class UserEmail {
  readonly value: string;

  private static readonly EMAIL_REGEX =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  constructor(value: string) {
    this.value = value;
    this.ensureEmailIsValid();
  }

  private ensureEmailIsValid() {
    if (!UserEmail.EMAIL_REGEX.test(this.value)) {
      throw new UserEmailNotValidError(this.value);
    }
  }
}
