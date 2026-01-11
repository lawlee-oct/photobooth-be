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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'uuid', unique: true, default: () => 'gen_random_uuid()' })
  uuid: string;

  @Column({ nullable: true })
  language: string;

  @Column({
    name: 'layout_type',
    type: 'enum',
    enum: LayoutType,
  })
  layoutType: LayoutType;

  @Column({ name: 'print_count', default: 1 })
  printCount: number;

  @Column({
    type: 'enum',
    enum: SessionStatus,
    default: SessionStatus.ON_GOING,
  })
  status: SessionStatus;

  @Column({ name: 'expired_at', nullable: true })
  expiredAt: Date;

  @Column({ name: 'photobooth_id' })
  @Index()
  photoboothId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Photobooth)
  @JoinColumn({ name: 'photobooth_id' })
  photobooth: Photobooth;
}
