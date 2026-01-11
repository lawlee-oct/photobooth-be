import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Discount } from './discount.entity';
import { PhotoSession } from './photo-session.entity';
import { User } from './user.entity';

export enum PaymentMethod {
  MOMO_QR = 'MOMO_QR',
  CASH = 'PAYMENT_CODE',
}

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
  })
  method: PaymentMethod;

  @Column({ type: 'decimal', precision: 15, scale: 0 })
  amount: number;

  @Column({ name: 'discount_id', nullable: true })
  discountId: number;

  @Column({
    name: 'discount_amount',
    type: 'decimal',
    precision: 15,
    scale: 0,
    default: 0,
  })
  discountAmount: number;

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 0 })
  totalAmount: number;

  @Column({ name: 'user_id' })
  @Index()
  userId: number;

  @Column({ name: 'photo_session_id' })
  @Index()
  photoSessionid: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => PhotoSession)
  @JoinColumn({ name: 'photo_session_id' })
  photoSession: PhotoSession;

  @ManyToOne(() => Discount)
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
