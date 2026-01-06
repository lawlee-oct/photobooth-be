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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'photobooth_id' })
  photoboothId: string;

  @ManyToOne(() => Photobooth)
  @JoinColumn({ name: 'photobooth_id' })
  photobooth: Photobooth;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  price: number;

  @Column({
    name: 'min_amount',
    type: 'decimal',
    precision: 15,
    scale: 2,
    nullable: true,
  })
  minAmount: number;

  @Column({ name: 'discount_percent', type: 'decimal', precision: 5, scale: 2 })
  discountPercent: number;

  @Column({ name: 'from_date' })
  fromDate: Date;

  @Column({ name: 'to_date' })
  toDate: Date;

  @Column({
    name: 'day_type',
    type: 'enum',
    enum: DayType,
    nullable: true,
  })
  dayType: DayType;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
