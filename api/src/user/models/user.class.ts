export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordAdmin: string | null;

  constructor(data?: Partial<User>) {
    Object.assign(this, data);
  }
}
