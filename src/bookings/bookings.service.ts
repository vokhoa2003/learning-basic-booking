import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { ServiceOption } from 'src/service-options/entities/service-option.entity';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
    @InjectRepository(ServiceOption)
    private readonly serviceOptionsRepository: Repository<ServiceOption>,
  ) {}


  async create(createBookingDto: CreateBookingDto) {
    const {user_id, option_id, quantity } = createBookingDto;
    const checkExitBooking = await this.bookingsRepository.findOneBy({ user_id, option_id });
    if (checkExitBooking) {
      throw new BadRequestException('You have already booked this service option');
    }
    const option = await this.serviceOptionsRepository.findOneBy({ id: option_id });
    if (!option) {
      throw new BadRequestException('Service option not found');
    }
    if (quantity > option.available_slot) {
      throw new BadRequestException('Insufficient available quantity for the selected service option');
    }
    option.available_slot -= quantity;

    const total_price = Number(option.price) * quantity;

    const booking = this.bookingsRepository.create({
      ...createBookingDto,
      total_price,
      status: createBookingDto.payment_method === "cash" ? 'paid' : 'pending',
    });

    await this.serviceOptionsRepository.save(option);
    return this.bookingsRepository.save(booking);
  }

  findAll(): Promise<Booking[]> {
    return this.bookingsRepository.find({ relations: ['user', 'option'] });
  }

  findOne(id: number) {
    return this.bookingsRepository.findOneBy({ id });
  }

  async update(user_id: number, option_id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingsRepository.findOneBy({ user_id, option_id });
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    const option = await this.serviceOptionsRepository.findOneBy({ id: booking.option_id });
    if (!option) {
      throw new BadRequestException('Service option not found');
    } 

    const oldQuantity = booking.quantity;
    const newQuantity = updateBookingDto.quantity ?? oldQuantity;

    if (newQuantity !== oldQuantity) {
      const newAvailableSlot = option.available_slot + oldQuantity - newQuantity;
      if (newAvailableSlot < 0) {
        throw new BadRequestException('Insufficient available quantity for the selected service option');
      }
      option.available_slot = newAvailableSlot;
      booking.total_price = Number(option.price) * newQuantity;
      if (updateBookingDto.status) {
        booking.status = updateBookingDto.status;
      }
      await this.serviceOptionsRepository.save(option);
      await this.bookingsRepository.save(booking);
    }
    
    return this.bookingsRepository.update({user_id, option_id}, updateBookingDto);
    
  }

  remove(id: number) {
    return `This action removes a #${id} booking`;
  }
}
