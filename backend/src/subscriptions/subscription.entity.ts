import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

enum Status {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  DEMO_CANCELED = 'DEMO_CANCELED',
}

@Entity({ name: 'subscriptions' })
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity_of_charges: number;

  @Column()
  charge_period: number;

  @Column({ type: 'timestamp' })
  start_date: Date;

  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: string;

  @Column({ type: 'timestamp' })
  status_date: Date;

  @Column({ type: 'timestamp', nullable: true })
  cancel_date: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'timestamp' })
  next_cycle: Date;

  // Relação N:1
  @ManyToOne(() => User, (user) => user.subscriptions)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;
}
