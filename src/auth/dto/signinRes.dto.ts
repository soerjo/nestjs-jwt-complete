import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { SignupResDto } from './signupRes.dto';

export class SigninResDto implements SignupResDto {
  id: string;

  email: string;

  @Exclude()
  createAt: Date;

  @Exclude()
  updatedAt: Date;

  @Exclude()
  password: string;

  @Exclude()
  hasedRt: string;

  constructor(obj: User) {
    Object.assign(this, obj);
  }
}
