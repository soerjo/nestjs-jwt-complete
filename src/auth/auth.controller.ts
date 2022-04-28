import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupReqDto, SigninReqDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  signupLocal(@Body() signupReq: SignupReqDto) {
    return this.authService.signupLocal(signupReq);
  }

  @Post('/local/signin')
  signinLocal(@Body() signinReq: SigninReqDto) {
    return this.authService.signinLocal(signinReq);
  }

  @Post('/logou')
  logout() {
    return this.authService.logout();
  }

  @Post('/get-refresh-token')
  getRefreshToken() {
    return this.authService.getRefreshToken();
  }
}
