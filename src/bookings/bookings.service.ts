import { BadRequestException, Injectable, Param } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './entities/booking.entity';
import { ServiceOption } from 'src/service-options/entities/service-option.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingsRepository: Repository<Booking>,
    @InjectRepository(ServiceOption)
    private readonly serviceOptionsRepository: Repository<ServiceOption>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async create(createBookingDto: CreateBookingDto) {
    let { user_id, option_id, option_name, quantity, user_info } = createBookingDto as any;
    console.log('CreateBookingDto received:', createBookingDto);
    // Cho phép truyền option_name hoặc option_id
    if (!option_id && option_name) {
      const option = await this.serviceOptionsRepository.findOne({ where: { option_name } });
      if (!option) throw new BadRequestException('Service option not found by option_name');
      option_id = option.id;
    }
    if (!option_id) throw new BadRequestException('Missing option_id or valid option_name');

    // Xử lý user: kiểm tra hoặc tạo mới
    if (!user_id) {
      if (!user_info) {
        throw new BadRequestException('Either user_id or user_info must be provided');
      }
      let existingUser = await this.userRepository.findOne({
        where: [
          { email: user_info.email },
          { phone: user_info.phone }
        ]
      });
      if (existingUser) {
        user_id = existingUser.id;
      } else {
        const timestamp = Date.now();
        const hashedPassword = await bcrypt.hash(`temp_${timestamp}`, 10);
        const newUser = this.userRepository.create({
          ...user_info,
          date_of_birth: new Date(user_info.date_of_birth),
          username: `user_${user_info.email.split('@')[0]}_${timestamp}`,
          password: hashedPassword,
          role: 'customer'
        });
        const savedUser: User | User[] = await this.userRepository.save(newUser);
  user_id = Array.isArray(savedUser) ? (savedUser[0] as User).id : (savedUser as User).id;
      }
    } else {
      const checkExitUser = await this.userRepository.findOneBy({ id: user_id });
      if (!checkExitUser) {
        throw new BadRequestException('User not found');
      }
    }

    // Kiểm tra booking trùng
    const checkExitBooking = await this.bookingsRepository.findOneBy({ user_id, option_id });
    if (checkExitBooking) {
      if (checkExitBooking.status === 'paid') {
        throw new BadRequestException('This booking has already been paid');
      }
      if (checkExitBooking.quantity !== quantity) {
        const updateDto: UpdateBookingDto = { quantity } as UpdateBookingDto;
        await this.update(user_id, option_id, updateDto);
        return this.bookingsRepository.findOneBy({ user_id, option_id });
      }
      return checkExitBooking;
    }

    // Kiểm tra service option
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
      user_id,
      option_id,
      quantity,
      total_price,
      status: createBookingDto.payment_method === "cash" ? 'paid' : 'pending',
      payment_method: createBookingDto.payment_method,
    });

    await this.serviceOptionsRepository.save(option);
    return this.bookingsRepository.save(booking);
  }

  findAll(filter?: { user_id?: number }): Promise<Booking[]> {
    const where: any = {};
    if (filter?.user_id) {
      where.user_id = filter.user_id;
    }
    return this.bookingsRepository.find({ where, relations: ['user', 'option'] });
  }

  findOne( user_id: number, option_id: number) {
    return this.bookingsRepository.findOneBy({ user_id, option_id });
  }

  async update(user_id: number, option_id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingsRepository.findOneBy({ user_id, option_id });
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    if (booking.status !== 'pending') {
      throw new BadRequestException('Only pending bookings can be updated');
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
      booking.quantity = newQuantity;
      booking.total_price = Number(option.price) * newQuantity;
    }
    if (updateBookingDto.status) {
      booking.status = updateBookingDto.status;
    }
    await this.serviceOptionsRepository.save(option);
    await this.bookingsRepository.save(booking);
    return this.bookingsRepository.findOneBy({ user_id, option_id });
  }

  async remove(id: number, currentUser?: { id: number, role: string }) {
    const booking = await this.bookingsRepository.findOne({ where: { id }, relations: ['user'] });
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    if (booking.status !== 'pending') {
      throw new BadRequestException('Only pending bookings can be deleted');
    }
    // Nếu là customer, chỉ được xóa booking của chính mình
    if (currentUser && currentUser.role === 'customer' && booking.user_id !== currentUser.id) {
      throw new BadRequestException('You do not have permission to delete this booking');
    }
    await this.bookingsRepository.delete(id);
    return { message: `Booking #${id} has been deleted` };
  }
}
