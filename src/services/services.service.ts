import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { ServiceOption } from 'src/service-options/entities/service-option.entity';
@Injectable()
export class ServicesService {
  constructor(
      @InjectRepository(Service)
      private readonly ServicesRepository: Repository<Service>,
      @InjectRepository(ServiceOption)
      private readonly ServiceOptionRepository: Repository<ServiceOption>,
  ) {}
  async create(createServiceDto: CreateServiceDto) {
    const isExist = await this.ServicesRepository.findOneBy({ service: createServiceDto.service });
    if (isExist) {
      throw new Error('Service name already exists');
    }
    return this.ServicesRepository.save(createServiceDto);
  }

  findAll(): Promise<Service[]>  {
    return this.ServicesRepository.find();
  }

  findAllWithOptions(option: string) {
    return this.ServicesRepository.find({
      relations: [option],
    })
  }

  findOne(query: any) {
    // Nếu không có query param nào, trả về tất cả
    if (Object.keys(query).length === 0) {
      return this.ServicesRepository.find();
    }

    // Tìm kiếm theo id
    if (query.id) {
      return this.ServicesRepository.findOne({ 
        where: { id: query.id },
        relations: query.option ? [query.option] : []
      });
    }

    // Tìm kiếm theo service name (chính xác)
    if (query.service) {
      return this.ServicesRepository.findOne({ 
        where: { service: query.service },
        relations: query.option ? [query.option] : ['options']
      });
    }

    // Tìm kiếm linh hoạt với nhiều điều kiện
    const whereConditions: any = {};
    
    if (query.description) {
      whereConditions.description = query.description;
    }
    
    if (query.create_by) {
      whereConditions.create_by = query.create_by;
    }

    return this.ServicesRepository.find({ 
      where: whereConditions,
      relations: query.option ? [query.option] : []
    });
  }

  update(id: number, updateServiceDto: UpdateServiceDto) {
    return `This action updates a #${id} service`;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
