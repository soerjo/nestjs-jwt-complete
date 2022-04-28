import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupReqDto, SigninReqDto, TokentResDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  signupLocal(@Body() signupReq: SignupReqDto): Promise<TokentResDto> {
    return this.authService.signupLocal(signupReq);
  }

  @Post('/local/signin')
  signinLocal(@Body() signinReq: SigninReqDto): Promise<TokentResDto> {
    return this.authService.signinLocal(signinReq);
  }

  @Post('/logout')
  logout() {
    // return this.authService.logout();
    return 'should be logout!';
  }

  @Post('/refresh-token')
  getRefreshToken() {
    // return this.authService.getRefreshToken();
    return 'should recieve new token!';
  }
}
