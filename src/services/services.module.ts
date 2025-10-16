import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { ServiceOption } from 'src/service-options/entities/service-option.entity';


@Module({
  imports: [ TypeOrmModule.forFeature([Service, ServiceOption])],
  controllers: [
    ServicesController,
  ],
  providers: [ServicesService],
  //exports: [Service],
})
export class ServicesModule {}
