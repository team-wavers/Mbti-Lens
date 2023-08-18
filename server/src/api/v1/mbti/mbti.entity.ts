import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mbti {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  user_id: number;

  @Column({ default: '' })
  ei: string;

  @Column({ default: '' })
  ns: string;

  @Column({ default: '' })
  tf: string;

  @Column({ default: '' })
  pj: string;

  @Column({ default: 0 })
  ei_like: number;

  @Column({ default: 0 })
  ns_like: number;

  @Column({ default: 0 })
  tf_like: number;

  @Column({ default: 0 })
  pj_like: number;
}
