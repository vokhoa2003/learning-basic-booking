import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Req() req, @Body() createServiceDto: CreateServiceDto) {
    const user_id = req.user.id;
    createServiceDto.create_by = user_id;
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  findAll(@Query('option') option?: string) {
    if(option){
      return this.servicesService.findAllWithOptions(option);
    }
    return this.servicesService.findAll();
  }

  @Get('search')
  findOne(@Query() query: any) {
    return this.servicesService.findOne(query);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
