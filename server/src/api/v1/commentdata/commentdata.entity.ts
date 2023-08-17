import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentData {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: number;

  @Column()
  mbti: string;

  @Column()
  status: number;

  @Column()
  comment: string;
}
