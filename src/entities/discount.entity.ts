import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Photobooth } from './photobooth.entity';

export enum DayType {
  WEEKDAY = 'WEEKDAY',
  WEEKEND = 'WEEKEND',
  HOLIDAY = 'HOLIDAY',
}

@Entity({ name: 'discounts' })
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 15, scale: 0 })
  price: number;

  @Column({
    name: 'min_amount',
    type: 'decimal',
    precision: 15,
    scale: 0,
    nullable: true,
  })
  minAmount: number;

  @Column({
    name: 'discount_percent',
    type: 'decimal',
    precision: 5,
    scale: 0,
    nullable: true,
  })
  discountPercent: number;

  @Column({ name: 'from_date', default: new Date() })
  fromDate: Date;

  @Column({ name: 'to_date', nullable: true })
  toDate: Date;

  @Column({
    name: 'day_type',
    type: 'enum',
    enum: DayType,
    nullable: true,
  })
  dayType: DayType;

  @Column({ name: 'is_permanent', default: false })
  isPermanent: boolean;

  @Column({ name: 'photobooth_id' })
  photoboothId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Photobooth)
  @JoinColumn({ name: 'photobooth_id' })
  photobooth: Photobooth;
}
