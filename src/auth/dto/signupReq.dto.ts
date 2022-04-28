import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignupReqDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'paswrod is to short min 8 Char' })
  password: string;
}
