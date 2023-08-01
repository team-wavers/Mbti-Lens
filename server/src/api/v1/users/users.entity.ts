import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

// 여기 부분 컬럼 설정 다시 설정하기(여러가지 속성이나 등등)
@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  _id!: number;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at?: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column()
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  phone_number!: string;

  @Column()
  mbti?: string;
}
