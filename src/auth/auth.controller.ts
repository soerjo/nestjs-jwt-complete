import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUserReq } from 'src/common/decorator/getUser.decorator';
import { Public } from 'src/common/decorator/public.decorator';
import { RefreshJwtGuard } from 'src/common/guard';
import { AuthService } from './auth.service';
import { SignupReqDto, SigninReqDto, TokentResDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/local/signup')
  signupLocal(@Body() signupReq: SignupReqDto): Promise<TokentResDto> {
    return this.authService.signupLocal(signupReq);
  }

  @Public()
  @Post('/local/signin')
  signinLocal(@Body() signinReq: SigninReqDto): Promise<TokentResDto> {
    return this.authService.signinLocal(signinReq);
  }

  @Post('/logout')
  logout(@GetUserReq() user: Partial<User>) {
    return this.authService.logout(user);
  }

  @Public()
  @UseGuards(RefreshJwtGuard)
  @Post('/refresh-token')
  getRefreshToken(@GetUserReq() user: Partial<User>) {
    console.log(user);
    return this.authService.getRefreshToken(user);
  }
}
