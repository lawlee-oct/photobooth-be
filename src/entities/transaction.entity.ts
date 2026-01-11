import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdminWallet } from './admin-wallet.entity';
import { Payment } from './payment.entity';
import { User } from './user.entity';

export enum TransactionType {
  DEPOSITE = 'DEPOSITE',
  WITHDRAW = 'WITHDRAW',
}

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  @Column({ name: 'from_account_id', nullable: true })
  fromAccountId: number;

  @Column({ name: 'account_name', nullable: true })
  accountName: string;

  @Column({
    name: 'balance_before',
    type: 'decimal',
    precision: 15,
    scale: 0,
    default: 0,
  })
  balanceBefore: number;

  @Column({
    name: 'balance_after',
    type: 'decimal',
    precision: 15,
    scale: 0,
    default: 0,
  })
  balanceAfter: number;

  @Column({ name: 'status' })
  status: string;

  @Column({ name: 'description', nullable: true })
  description: string;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'admin_wallet_id', nullable: true })
  adminWalletId: number;

  @Column({ name: 'payment_id', nullable: true })
  paymentId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Payment)
  @JoinColumn({ name: 'payment_id' })
  payment: Payment;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => AdminWallet)
  @JoinColumn({ name: 'admin_wallet_id' })
  adminWallet: AdminWallet;
}
