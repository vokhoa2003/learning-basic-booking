import { Injectable } from '@nestjs/common';
import { CreateServiceOptionDto } from './dto/create-service-option.dto';
import { UpdateServiceOptionDto } from './dto/update-service-option.dto';
//import { UpdateBookingDto } from 'src/bookings/dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceOption } from './entities/service-option.entity';
import { Service } from 'src/services/entities/service.entity';

@Injectable()
export class ServiceOptionsService {
  constructor(
    @InjectRepository(ServiceOption)
    private readonly serviceOptionsRepository: Repository<ServiceOption>,
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
  ) {}

  async create(createServiceOptionDto: CreateServiceOptionDto) {
    const isExist = await this.serviceOptionsRepository.findOneBy({ option_name: createServiceOptionDto.option_name });
    const isExistService = await this.serviceRepository.findOneBy({ id: createServiceOptionDto.service_id });
    if (!isExistService) {
      throw new Error('Service does not exist');
    }
    if (isExist) {
      throw new Error('Service option name already exists');
    }
    const newServiceOption = this.serviceOptionsRepository.create(createServiceOptionDto);
    return this.serviceOptionsRepository.save(newServiceOption);
  }

  findAll() {
    return this.serviceOptionsRepository.find(
      { relations: ['service'] }
    );
  }

  findOne(id: number) {
    return this.serviceOptionsRepository.findOneBy({ id });
  }

  async update(id: number, updateServiceOptionDto: UpdateServiceOptionDto) {
    const oldDto = await this.serviceOptionsRepository.findOneBy({id});
    // if (!oldDto) {
    //   throw new Error('Service option does not exist');
    // }
    // if (oldDto.price !== updateServiceOptionDto.price) {
      
    // }
    return this.serviceOptionsRepository.update(id, updateServiceOptionDto);
  }

  remove(id: number) {
    return this.serviceOptionsRepository.delete(id);
  }
}
