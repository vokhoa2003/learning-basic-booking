// import { Controller, Get, Query } from '@nestjs/common';
// import { AppService } from './app.service';

// @Controller('test')
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }
//   @Get('goodbye')
//   getGoodbye(): string {
//     return this.appService.getGoodbye();
//   }
//   @Get('send')
//   async send(@Query('role') role: string) {
//     const result = await this.appService.sendPost(role);
//     console.log('API Response:', result);
//     return result;
//   }

// }
