import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PhotoSession } from './photo-session.entity';

export enum PrintJobStatus {
  PENDING = 'PENDING',
  PRINTING = 'PRINTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity({ name: 'print_jobs' })
export class PrintJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'print_count', default: 1 })
  printCount: number;

  @Column({
    type: 'enum',
    enum: PrintJobStatus,
    default: PrintJobStatus.PENDING,
  })
  status: PrintJobStatus;

  @Column({ name: 'photo_session_id' })
  photoSessionid: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => PhotoSession)
  @JoinColumn({ name: 'photo_session_id' })
  photoSession: PhotoSession;
}
