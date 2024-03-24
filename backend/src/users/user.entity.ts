import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Subscription } from '../subscriptions/subscription.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  // Relação 1:N
  @OneToMany(() => Subscription, (subscription) => subscription.userId)
  subscriptions: Subscription[];
}
