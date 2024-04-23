import { Request } from 'express';
import { AppService } from './app.service';
import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() req: Request): string {
    console.log(req.cookies);
    return this.appService.getHello();
  }

}
