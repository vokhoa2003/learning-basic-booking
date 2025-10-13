import { Test, TestingModule } from '@nestjs/testing';
import { ServiceOptionsController } from './service-options.controller';
import { ServiceOptionsService } from './service-options.service';

describe('ServiceOptionsController', () => {
  let controller: ServiceOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceOptionsController],
      providers: [ServiceOptionsService],
    }).compile();

    controller = module.get<ServiceOptionsController>(ServiceOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
