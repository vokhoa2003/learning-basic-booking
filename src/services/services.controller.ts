import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('services')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}


  @Post()
  @Roles('admin')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Get()
  @Roles('admin','customer')
  findAll(@Query('option') option?: string) {
    if(option){
      return this.servicesService.findAllWithOptions(option);
    }
    return this.servicesService.findAll();
  }

// nếu đặt là @Params('option) thì set up @Get('option/:option')
// nếu đặt là Query('option') thì set up link call là ....folder?option=tên bảng kết nối 
  // @Get()
  // findAllWithOptions(@Query('option') option: string){
  //   if(option){
  //     return this.servicesService.findAllWithOptions(option);
  //   }
  //   return this.servicesService.findAll();
  // }

  @Get(':id')
  @Roles('admin','customer')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.servicesService.update(+id, updateServiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }

  private extractServicesIdentifiers(req: any, dto: UpdateServiceDto) {
    const role = req.user.role;
    let user_id: number;
  }
}
