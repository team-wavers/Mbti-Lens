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

  @OneToOne(() => Users) // 다대일 관계 설정
  @JoinColumn({ name: 'userId', referencedColumnName: 'email' }) // 참조할 컬럼 설정
  user: Users;

  @Column()
  mbti: string;
  //코멘트를 위한 수정 필요
}
