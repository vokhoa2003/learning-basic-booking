import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServiceOptionsService } from './service-options.service';
import { CreateServiceOptionDto } from './dto/create-service-option.dto';
import { UpdateServiceOptionDto } from './dto/update-service-option.dto';

@Controller('service-options')
export class ServiceOptionsController {
  constructor(private readonly serviceOptionsService: ServiceOptionsService) {}

  @Post()
  create(@Body() createServiceOptionDto: CreateServiceOptionDto) {
    return this.serviceOptionsService.create(createServiceOptionDto);
  }

  @Get()
  findAll() {
    return this.serviceOptionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serviceOptionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceOptionDto: UpdateServiceOptionDto) {
    return this.serviceOptionsService.update(+id, updateServiceOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serviceOptionsService.remove(+id);
  }
}
