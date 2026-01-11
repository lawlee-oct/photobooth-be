import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Camera } from './camera.entity';
import { Printer } from './printer.entity';

export enum PhotoboothStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

@Entity({ name: 'photobooths' })
export class Photobooth {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  location: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: PhotoboothStatus,
    default: PhotoboothStatus.ACTIVE,
  })
  status: PhotoboothStatus;

  @Column({ name: 'camera_id' })
  cameraId: number;

  @ManyToOne(() => Camera)
  @JoinColumn({ name: 'camera_id' })
  camera: Camera;

  @Column({ name: 'printer_id' })
  printerId: number;

  @ManyToOne(() => Printer)
  @JoinColumn({ name: 'printer_id' })
  printer: Printer;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
