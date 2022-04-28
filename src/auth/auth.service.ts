import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninReqDto, SignupReqDto, TokentResDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signupLocal(signupDto: SignupReqDto): Promise<TokentResDto> {
    let user = await this.findUser(signupDto);
    if (user)
      throw new BadRequestException(`email: ${signupDto.email} already exists`);

    user = await this.prismaService.user.create({
      data: {
        email: signupDto.email,
        password: hashSync(signupDto.password, genSaltSync()),
      },
    });

    return await this.signJwt(user);
  }

  async signinLocal(signupDto: SigninReqDto): Promise<TokentResDto> {
    const user = await this.findUser(signupDto);
    if (!user)
      throw new BadRequestException(
        `user with email: ${signupDto.email} not found`,
      );

    return await this.signJwt(user);
  }

  async signJwt(user: Partial<User>) {
    const payload = {
      id: user.id,
      email: user.email,
    };
    const access_token: string = await this.jwtService.signAsync(payload, {
      secret: this.config.get('SECRET_KEY_JWT'),
      expiresIn: '1m',
    });
    const refresh_token: string = await this.jwtService.signAsync(payload, {
      secret: this.config.get('SECRET_KEY_JWT'),
      expiresIn: '1h',
    });

    await this.saveCache(payload, refresh_token);
    return new TokentResDto({ access_token, refresh_token });
  }

  async saveCache(user: Partial<User>, refresh_token: string) {
    const cache = await this.prismaService.cache.findUnique({
      where: { userid: user.id },
    });

    if (!cache) {
      await this.prismaService.cache.create({
        data: { userid: user.id, refreshToken: refresh_token },
      });
    } else {
      await this.prismaService.cache.update({
        where: { userid: user.id },
        data: { refreshToken: refresh_token },
      });
    }
  }

  async findUser(user: Partial<User>): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { email: user.email },
    });
  }

  async logout(user: Partial<User>) {
    const cache = await this.prismaService.cache.findUnique({
      where: { userid: user.id },
    });
    if (cache)
      await this.prismaService.cache.delete({ where: { userid: user.id } });
  }

  async getRefreshToken(
    user: Partial<User>,
    refresh_token: string,
  ): Promise<TokentResDto> {
    const cache = await this.prismaService.cache.findFirst({
      where: { refreshToken: refresh_token },
    });

    if (!cache) throw new ForbiddenException('please login again!');

    return await this.signJwt(user);
  }
}
