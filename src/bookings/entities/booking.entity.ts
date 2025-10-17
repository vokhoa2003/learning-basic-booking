// booking.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { User } from '../../user/entities/user.entity'; 
import { ServiceOption } from '../../service-options/entities/service-option.entity';
import { IsOptional } from 'class-validator';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  option_id: number;

  @ManyToOne(() => ServiceOption, (option) => option.bookings, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'option_id' })
  option: ServiceOption;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @IsOptional()
  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({ type: 'enum', enum: ['pending', 'paid', 'cancelled'], default: 'pending' })
  status: string;

  @Column({ nullable: true })
  payment_method: 'cash' | 'bank_transfer';

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

}

