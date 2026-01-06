import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Account } from './account.entity';
import { Discount } from './discount.entity';
import { Payment } from './payment.entity';
import { PhotoSession } from './photo-session.entity';

export enum TransactionType {
  DEPOSITE = 'DEPOSITE',
  WITHDRAW = 'WITHDRAW',
}

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({
    name: 'transaction_type',
    type: 'enum',
    enum: TransactionType,
  })
  transactionType: TransactionType;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @Column({ name: 'account_id' })
  accountId: string;

  @ManyToOne(() => Account)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({ name: 'related_payment_id', nullable: true })
  relatedPaymentId: string;

  @ManyToOne(() => Payment)
  @JoinColumn({ name: 'related_payment_id' })
  relatedPayment: Payment;

  @Column({ name: 'discount_id', nullable: true })
  discountId: string;

  @ManyToOne(() => Discount)
  @JoinColumn({ name: 'discount_id' })
  discount: Discount;

  @Column({ name: 'photo_session_id', nullable: true })
  photoSessionId: string;

  @ManyToOne(() => PhotoSession)
  @JoinColumn({ name: 'photo_session_id' })
  photoSession: PhotoSession;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
