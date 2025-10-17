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
    // Kiểm tra tồn tại theo service name
    const isExist = await this.ServicesRepository.findOne({ 
      where: { service: createServiceDto.service } 
    });
    
    if (isExist) {
      // Nếu đã tồn tại, tự động gọi update
      return this.update(isExist.id as number, createServiceDto);
    }
    
    // Nếu chưa tồn tại, tạo mới
    const newService = this.ServicesRepository.create(createServiceDto);
    return this.ServicesRepository.save(newService);
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

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    // Kiểm tra service có tồn tại không
    const service = await this.ServicesRepository.findOneBy({ id });
    if (!service) {
      throw new Error('Service not found');
    }

    // Nếu cập nhật service name, kiểm tra trùng lặp với service khác
    if (updateServiceDto.service && updateServiceDto.service !== service.service) {
      const existingService = await this.ServicesRepository.findOne({
        where: { service: updateServiceDto.service }
      });
      if (existingService && existingService.id !== id) {
        throw new Error('Service name already exists');
      }
    }

    // Thực hiện cập nhật
    await this.ServicesRepository.update(id, updateServiceDto);
    return this.ServicesRepository.findOne({ 
      where: { id },
      relations: ['options']
    });
  }

  async remove(id: number) {
    // Kiểm tra service có tồn tại không
    const service = await this.ServicesRepository.findOneBy({ id });
    if (!service) {
      throw new Error('Service not found');
    }

    // Xóa service
    await this.ServicesRepository.delete(id);
    return { 
      message: `Service #${id} has been successfully removed`,
      deletedService: service 
    };
  }
}
