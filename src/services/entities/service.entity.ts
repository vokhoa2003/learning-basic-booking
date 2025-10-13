import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ServiceOption } from '../../service-options/entities/service-option.entity';

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column({ type: 'varchar', length: 255 })
    service: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    create_by: number;

    @ManyToOne(() => User, (user) => user.createdServices)
    @JoinColumn({ name: 'create_by' })
    createByUser: User

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    create_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    update_at: Date;

    @OneToMany(() => ServiceOption, (option) => option.service)
    options: ServiceOption[]


}
