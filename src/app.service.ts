// import { Injectable } from '@nestjs/common';
// import { HttpService } from '@nestjs/axios';
// import { firstValueFrom } from 'rxjs';

// @Injectable()
// export class AppService {
//   getHello(): string {
//     return 'Hello World!';
//   }
//   getGoodbye(): string {
//     return 'Goodbye World!';
//   }
//   constructor(private readonly httpService: HttpService) {}
//   async sendPost(role: string) {
//     const url = 'http://localhost/API_Secu/app/index.php?action=get';
//     const data = { role };

//     try {
//       const response$ = this.httpService.post(url, data, {
//         headers: { 'Content-Type': 'application/json' }, // hoặc 'application/x-www-form-urlencoded' nếu server PHP yêu cầu
//       });
//       const response = await firstValueFrom(response$); // convert Observable → Promise
//       return response.data; // dữ liệu trả về từ API PHP
//     } catch (error) {
//       console.error('Error calling API:', error.message);
//       return null;
//     }
//   }
// }
