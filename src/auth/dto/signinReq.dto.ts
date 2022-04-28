import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SigninReqDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'password to short, must be more then 8 char' })
  password: string;
}
