import { hostname } from 'os';
import { Controller, Get } from '@nestjs/common';
import { GetUserReq } from './common/decorator/getUser.decorator';

@Controller('/')
export class AppController {
  @Get()
  test(@GetUserReq('id') id: string, @GetUserReq('email') email: string) {
    return { message: `the hostname: ${hostname}`, userId: id, email: email };
  }
}
