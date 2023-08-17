import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mbti {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: number;

  @Column()
  mbti: string;
}
