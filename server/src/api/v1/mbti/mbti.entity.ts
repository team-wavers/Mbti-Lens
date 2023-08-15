import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mbti {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: string;

  @Column()
  mbti: string;
  //코멘트를 위한 수정 필요

  // @Column('text', { array: true })
  // mbti_a: string[][];

  // @Column('text', { array: true })
  // mbti_b: string[][];

  // @Column('text', { array: true })
  // mbti_c: string[][];

  // @Column('text', { array: true })
  // mbti_d: string[][];
}
