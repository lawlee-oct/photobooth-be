import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum CameraStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE',
}

@Entity({ name: 'cameras' })
export class Camera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  model: string;

  @Column({
    type: 'enum',
    enum: CameraStatus,
    default: CameraStatus.ACTIVE,
  })
  status: CameraStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
