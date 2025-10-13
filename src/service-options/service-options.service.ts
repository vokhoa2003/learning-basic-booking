import { Injectable } from '@nestjs/common';
import { CreateServiceOptionDto } from './dto/create-service-option.dto';
import { UpdateServiceOptionDto } from './dto/update-service-option.dto';

@Injectable()
export class ServiceOptionsService {
  create(createServiceOptionDto: CreateServiceOptionDto) {
    return 'This action adds a new serviceOption';
  }

  findAll() {
    return `This action returns all serviceOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} serviceOption`;
  }

  update(id: number, updateServiceOptionDto: UpdateServiceOptionDto) {
    return `This action updates a #${id} serviceOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} serviceOption`;
  }
}
