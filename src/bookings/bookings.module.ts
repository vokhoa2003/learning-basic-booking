import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { ServiceOption } from 'src/service-options/entities/service-option.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([Booking]),
    TypeOrmModule.forFeature([ServiceOption]),
    TypeOrmModule.forFeature([User])
    ],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
