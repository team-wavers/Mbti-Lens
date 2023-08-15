import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Users } from '../users/users.entity';

@Entity()
export class Mbti {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: string;

  @Column()
  mbti: string;
  //코멘트를 위한 수정 필요
}
