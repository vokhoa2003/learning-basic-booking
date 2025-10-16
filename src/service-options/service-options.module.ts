import { Module } from '@nestjs/common';
import { ServiceOptionsService } from './service-options.service';
import { ServiceOptionsController } from './service-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceOption } from './entities/service-option.entity';
import { Service } from 'src/services/entities/service.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ServiceOption, Service])],
  controllers: [ServiceOptionsController],
  providers: [ServiceOptionsService]
})
export class ServiceOptionsModule {}
