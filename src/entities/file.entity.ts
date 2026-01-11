import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Frame } from './frame.entity';
import { PhotoSession } from './photo-session.entity';

export enum FileType {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
}

@Entity({ name: 'files' })
export class File {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'photo_session_id' })
  photoSessionid: number;

  @Column({ name: 'local_path' })
  localPath: string;

  @Column({ name: 'frame_id', nullable: true })
  frameid: number;

  @Column({
    type: 'enum',
    enum: FileType,
  })
  type: FileType;

  @Column({ name: 'is_permanent', default: false })
  isPermanent: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Frame)
  @JoinColumn({ name: 'frame_id' })
  frame: Frame;

  @ManyToOne(() => PhotoSession)
  @JoinColumn({ name: 'photo_session_id' })
  photoSession: PhotoSession;
}
