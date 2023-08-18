import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CommentData {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  host_id: number;

  @Column()
  mbti: string;

  @Column()
  like: boolean;

  @Column()
  comment: string;
}
