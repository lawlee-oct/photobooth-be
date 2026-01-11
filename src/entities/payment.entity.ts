import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Order } from './order.entity';

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
}

@Entity({ name: 'payments' })
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status: PaymentStatus;

  @Column({ name: 'provider' })
  provider: string;

  @Column({ name: 'provider_payment_id' })
  providerPaymentId: string;

  @Column({ name: 'request_payload', nullable: true })
  requestPayload: string;

  @Column({ name: 'response_payload', nullable: true })
  responsePayload: string;

  @Column({ name: 'paid_at', nullable: true })
  paidAt: Date;

  @Column({ name: 'total_amount', type: 'decimal', precision: 15, scale: 0 })
  totalAmount: number;

  @Column({ name: 'order_id' })
  orderId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}
