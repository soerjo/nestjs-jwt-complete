import { hostname } from 'os';
import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  @HttpCode(200)
  test() {
    console.log(`this hostname: ${hostname}`);
    return { message: `the hostname: ${hostname}` };
  }
}
