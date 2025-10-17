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
    createBookingDto.user_id = user_id;
    createBookingDto.option_id = option_id;
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  @Roles('admin', 'customer')
  findAll(@Req() req) {
    const role = req.user.role;
    if (role === 'admin') {
      return this.bookingsService.findAll();
    }
    // customer chỉ xem booking của mình
    return this.bookingsService.findAll({ user_id: req.user.id });
  }

  @Get('search')
  @Roles('customer','admin')
  async findOne(@Req() req, @Body() createBookingDto: CreateBookingDto) {
    const { user_id, option_id } = await this.extractBookingIdentifiers(req, createBookingDto);
    return this.bookingsService.findOne( user_id, option_id);
  }

  @Patch()
  @Roles('customer','admin')
  async update(@Req() req, @Body() updateBookingDto: UpdateBookingDto) {
    const { user_id, option_id } = this.extractBookingIdentifiers(req, updateBookingDto);
    // Chỉ cho phép customer sửa booking của mình, và chỉ booking pending (đã enforce ở service)
    if (req.user.role === 'customer' && req.user.id !== user_id) {
      throw new BadRequestException('You do not have permission to update this booking');
    }
    return this.bookingsService.update(user_id, option_id, updateBookingDto);
  }

  @Delete(':id')
  @Roles('customer','admin')
  remove(@Param('id') id: string, @Req() req) {
    return this.bookingsService.remove(+id, req.user);
  }

  private extractBookingIdentifiers(req: any, dto: UpdateBookingDto) {
    const role = req.user.role;
    let user_id: number;
    let option_id: number;

    if (!dto.option_id ) {
      throw new BadRequestException('Missing option_id in request body');
    }
    option_id = Number(dto.option_id);
    console.log('Extract createBookingDto:', dto);
    if (role === 'customer') {
      if (!req.user?.id) {
        throw new BadRequestException('Customer user_id not found in token');
      }
      user_id = Number(req.user.id);
    } else if (role === 'admin') {
      if (!dto.user_info && !dto.user_id) {
        throw new BadRequestException('Admin must specify user_id in body'+ (JSON.stringify(dto)));
      }
      user_id = Number(dto.user_id);
    } else {
      throw new BadRequestException('Invalid role or missing permission');
    }

    return { user_id, option_id };
  }
}
