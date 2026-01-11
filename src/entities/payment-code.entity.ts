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

import { AdminWallet } from './admin-wallet.entity';

@Entity({ name: 'payment_codes' })
export class PaymentCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code' })
  code: string;

  @Column({ type: 'decimal', precision: 15, scale: 0 })
  amount: number;

  @Column({
    name: 'used_amount',
    type: 'decimal',
    precision: 15,
    scale: 0,
    default: 0,
  })
  usedAmount: number;

  @Column({ name: 'expired_at' })
  expiredAt: Date;

  @Column({ name: 'admin_wallet_id' })
  adminWalletId: number;

  @Column({ name: 'created_by_id' })
  @Index()
  createdByUserId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => AdminWallet)
  @JoinColumn({ name: 'admin_wallet_id' })
  adminWallet: AdminWallet;
}
