import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { ERequestStatus, Media } from './interfaces/request.interface';

@Entity()
export default class Request {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index()
  @Column()
  userId: string;

  @Column('varchar', { array: true, nullable: true })
  products: string[];

  @Column()
  description: string;

  @Column('varchar', { nullable: false })
  title: string;

  @Column('int', { default: 0 })
  budget: number;

  @Column('varchar', { array: true })
  tags: string[];

  @Column({ default: 'IN_PROGRESS' })
  status: ERequestStatus;

  @Column('boolean', { default: false })
  readyForAnalogues: boolean;

  @Column('boolean', { default: false })
  delete: boolean;

  @Column()
  isDraft: boolean;

  @Column({ default: '' })
  cover: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    nullable: false,
  })
  media: Media[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
