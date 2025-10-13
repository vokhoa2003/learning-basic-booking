import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';

@Injectable()
export class ServicesService {
  constructor(
      @InjectRepository(Service)
      private readonly ServicesRepository: Repository<Service>,
  ) {}
  create(createServiceDto: CreateServiceDto) {
    return 'This action adds a new service';
  }

  findAll(): Promise<Service[]>  {
    return this.ServicesRepository.find();
  }

  findAllWithOptions(option: string) {
    return this.ServicesRepository.find({
      relations: [option],
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} service`;
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
