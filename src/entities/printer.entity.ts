import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PrinterStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

@Entity({ name: 'printers' })
export class Printer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column({ name: 'paper_remaining', default: 0 })
  paperRemaining: number;

  @Column({
    type: 'enum',
    enum: PrinterStatus,
    default: PrinterStatus.ACTIVE,
  })
  status: PrinterStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
