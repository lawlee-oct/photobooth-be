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
import { Printer } from './printer.entity';

export enum PrintJobStatus {
  PENDING = 'PENDING',
  PRINTING = 'PRINTING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Entity({ name: 'print_jobs' })
export class PrintJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'photo_session_id' })
  photoSessionId: string;

  @ManyToOne(() => PhotoSession)
  @JoinColumn({ name: 'photo_session_id' })
  photoSession: PhotoSession;

  @Column({ default: 1 })
  copies: number;

  @Column({
    type: 'enum',
    enum: PrintJobStatus,
    default: PrintJobStatus.PENDING,
  })
  status: PrintJobStatus;

  @Column({ name: 'printer_id', nullable: true })
  printerId: string;

  @ManyToOne(() => Printer)
  @JoinColumn({ name: 'printer_id' })
  printer: Printer;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
