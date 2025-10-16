import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/authorization/roles.decorator';
import { RolesGuard } from 'src/authorization/roles.guard';

@Controller('bookings')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @Roles('customer','admin')
  create(@Req() req, @Body() createBookingDto: CreateBookingDto) {
    const { user_id, option_id } = this.extractBookingIdentifiers(req, createBookingDto);
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch()
  @Roles('customer','admin')
  async update(@Req() req, @Body() updateBookingDto: UpdateBookingDto) {
    //console.log('User info from JWT:', req);
    //console.log('UpdateBookingDto:', updateBookingDto);
    const { user_id, option_id } = this.extractBookingIdentifiers(req, updateBookingDto);
    return this.bookingsService.update(user_id, option_id, updateBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsService.remove(+id);
  }

  private extractBookingIdentifiers(req: any, dto: UpdateBookingDto) {
    const role = req.user.role;
    let user_id: number;
    let option_id: number;

    if (!dto.option_id) {
      throw new BadRequestException('Missing option_id in request body');
    }
    option_id = Number(dto.option_id);

    if (role === 'customer') {
      if (!req.user?.id) {
        throw new BadRequestException('Customer user_id not found in token');
      }
      user_id = Number(req.user.id);
    } else if (role === 'admin') {
      if (!dto.user_id) {
        throw new BadRequestException('Admin must specify user_id in body');
      }
      user_id = Number(dto.user_id);
    } else {
      throw new BadRequestException('Invalid role or missing permission');
    }

    return { user_id, option_id };
  }
}
