import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';

export class SignupReqDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Min(8, { message: 'paswrod is to short min 8 Char' })
  password: string;
}
