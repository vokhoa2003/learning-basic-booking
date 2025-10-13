import { Module } from '@nestjs/common';
import { ServiceOptionsService } from './service-options.service';
import { ServiceOptionsController } from './service-options.controller';

@Module({
  controllers: [ServiceOptionsController],
  providers: [ServiceOptionsService],
})
export class ServiceOptionsModule {}
