import { Controller, Get } from '@nestjs/common';

@Controller()
export class ApiController {
  @Get('ping')
  ping() {
    return {
      timestamp: Math.floor(new Date().getTime() / 1000),
    };
  }
}
