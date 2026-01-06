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

export enum LayoutType {
  TWO = 2,
  FOUR = 4,
  SIX = 6,
}

export enum SessionStatus {
  FINISH = 'FINISH',
  ON_GOING = 'ON_GOING',
}

@Entity({ name: 'photo_sessions' })
export class PhotoSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'photobooth_id' })
  photoboothId: string;

  @ManyToOne(() => Photobooth)
  @JoinColumn({ name: 'photobooth_id' })
  photobooth: Photobooth;

  @Column({ nullable: true })
  language: string;

  @Column({
    name: 'layout_type',
    type: 'enum',
    enum: LayoutType,
  })
  layoutType: LayoutType;

  @Column({ default: 1 })
  quantity: number;

  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.ON_GOING,
  })
  status: SessionStatus;

  @Column({ name: 'expired_at', nullable: true })
  expiredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
