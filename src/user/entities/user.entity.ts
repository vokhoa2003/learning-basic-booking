import { Entity , Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Service } from '../../services/entities/service.entity';
import { ServiceOption } from '../../service-options/entities/service-option.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Exclude, Type } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    first_name: string;

    @Column({ type: 'varchar', length: 255 })
    last_name: string;

    @Column({ default: "customer" })
    role: string;

    @Column({ type: 'int' })
    gender: number;

    @Column({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column({type: 'text'})
    address: string;

    @Column({type: 'varchar', length: 100})
    city: string;

    @Column({type: 'date'})
    date_of_birth: Date;

    @Exclude()
    @Column({ type: 'varchar', length: 150, unique: true })
    username: string;

    @Exclude()
    @Column({ type: 'varchar', length: 255 })
    password: string;

    @Exclude()
    @Column({ type: 'text', nullable: true })
    refresh_token: string | null;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    create_at: Date;

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    update_at: Date;

    @OneToMany(() => Service, (service) => service.createByUser)
    createdServices: Service[];

    @OneToMany(() => ServiceOption, (option) => option.createByUser)
    createdOptions: ServiceOption[];

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];

}
