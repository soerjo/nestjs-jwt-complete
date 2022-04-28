import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class SignupResDto implements User {
  id: string;
  email: string;
  createAt: Date;
  updatedAt: Date;

  @Exclude()
  password: string;
  @Exclude()
  hasedRt: string;

  constructor(obj: Partial<User>) {
    Object.assign(this, obj);
  }
}
