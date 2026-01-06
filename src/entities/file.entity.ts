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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'photo_session_id' })
  photoSessionId: string;

  @ManyToOne(() => PhotoSession)
  @JoinColumn({ name: 'photo_session_id' })
  photoSession: PhotoSession;

  @Column({ name: 'local_path' })
  localPath: string;

  @Column({ name: 'frame_id', nullable: true })
  frameId: string;

  @ManyToOne(() => Frame)
  @JoinColumn({ name: 'frame_id' })
  frame: Frame;

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
}
