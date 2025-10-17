import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServiceOptionsService } from './service-options.service';
import { CreateServiceOptionDto } from './dto/create-service-option.dto';
import { UpdateServiceOptionDto } from './dto/update-service-option.dto';
import { ServiceOption } from './entities/service-option.entity';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('service-options')
//@UseGuards(JwtAuthGuard, RolesGuard)
export class ServiceOptionsController {
  constructor(private readonly serviceOptionsService: ServiceOptionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateServiceOptionDto: UpdateServiceOptionDto) {
    return this.serviceOptionsService.update(+id, updateServiceOptionDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.serviceOptionsService.remove(+id);
  }
}
