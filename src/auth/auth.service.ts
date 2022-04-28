import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninReqDto, SignupReqDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signupLocal(signupDto: SignupReqDto) {
    const user = await this.prismaService.user.create({
      data: {
        email: signupDto.email,
        password: signupDto.password,
      },
    });
    return user;
  }

  async signinLocal(signupDto: SigninReqDto) {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: signupDto.email,
      },
    });

    if (!user)
      throw new BadRequestException(
        `user with email: ${signupDto.email} not found`,
      );

    return user;
  }

  async logout() {
    return '/logout';
  }

  async getRefreshToken() {
    return '/get-refresh-token';
  }
}
