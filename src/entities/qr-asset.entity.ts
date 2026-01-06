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

@Entity({ name: 'qr_assets' })
export class QRAsset {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'photo_session_id' })
  photoSessionId: string;

  @ManyToOne(() => PhotoSession)
  @JoinColumn({ name: 'photo_session_id' })
  photoSession: PhotoSession;

  @Column({ name: 'qr_code', type: 'text' })
  qrCode: string;

  @Column()
  url: string;

  @Column({ name: 'expired_at', nullable: true })
  expiredAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
