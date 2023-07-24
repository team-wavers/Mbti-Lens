import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/**
 * v1 api list
 *
 * auth/signup
 * auth/signup/callback
 * auth/login
 * auth/verify
 *
 * users/:userId/mbtis
 * users/:userId/mbtis/:mbti/comments
 *
 */
