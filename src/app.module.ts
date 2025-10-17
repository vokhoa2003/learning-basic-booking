import { Module } from '@nestjs/common';
//import { AppController } from './app.controller';
//import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { HttpModule } from '@nestjs/axios';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { TypeOrmModuleConfig } from './database/typeorm.module.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServicesModule } from './services/services.module';
import { ServiceOptionsModule } from './service-options/service-options.module';
import { BookingsModule } from './bookings/bookings.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';


@Module({
  imports: [UserModule, 
    HttpModule, 
    ProductModule,
    TypeOrmModule.forRoot(TypeOrmModuleConfig),
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServicesModule,
    ServiceOptionsModule,
    BookingsModule,
  ],
  controllers: [
  ],
  providers: [
    //AppService,
    {
      provide: 'APP_INTERCEPTOR',
      useFactory: (reflector: Reflector) => new ClassSerializerInterceptor(reflector),
      inject: [Reflector],
    }
  ],
})
export class AppModule {}
