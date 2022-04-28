import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AccessJwtStrategy, RefreshJwtStrategy } from '../common/strategy';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AccessJwtStrategy,
    RefreshJwtStrategy,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
