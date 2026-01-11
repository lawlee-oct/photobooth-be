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

@Entity({ name: 'pricings' })
export class Pricing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 15, scale: 0 })
  pricing: number;

  @Column({ name: 'print_count', nullable: true })
  printCount: number;

  @Column({ name: 'price_label', nullable: true })
  priceLabel: string;

  @Column({ name: 'from_print_count', nullable: true })
  fromPrintCount: number; //  pricing will be applied from this print count

  @Column({ name: 'photobooth_id' })
  photoboothId: number;

  @ManyToOne(() => Photobooth)
  @JoinColumn({ name: 'photobooth_id' })
  photobooth: Photobooth;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
