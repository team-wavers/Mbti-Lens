import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mbti {
  @PrimaryGeneratedColumn()
  _id!: number;

  @Column()
  user_id!: number;

  @Column('char', { length: 1, default: '' })
  ei?: string;

  @Column('char', { length: 1, default: '' })
  ns?: string;

  @Column('char', { length: 1, default: '' })
  tf?: string;

  @Column('char', { length: 1, default: '' })
  pj?: string;

  @Column({ default: 0 })
  ei_like?: number;

  @Column({ default: 0 })
  ns_like?: number;

  @Column({ default: 0 })
  tf_like?: number;

  @Column({ default: 0 })
  pj_like?: number;
}
