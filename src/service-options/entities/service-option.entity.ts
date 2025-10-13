import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { User } from '../../user/entities/user.entity';
import { Booking } from '../../bookings/entities/booking.entity';

@Entity()
export class ServiceOption {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    service_id: number;

    @ManyToOne(() => Service, (service) => service.options, { onDelete: 'CASCADE'})
    @JoinColumn({ name: "service_id"})
    service: Service;

    @Column({ length: 150 })
    option_name: string;

    @Column({ type: 'text', nullable: true})
    description: string;

    @Column('decimal', {precision: 10, scale: 2})
    price: number;

    @Column({ type: 'int' })
    available_slot: number;
    
    @Column({ nullable: true })
    create_by: number

    @ManyToOne(() => User, (user) => user.createdOptions)
    @JoinColumn({ name: 'create_by'})
    createByUser: User;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updated_at: Date;

    @OneToMany(() => Booking, (booking) => booking.option)
    bookings: Booking[];
}
