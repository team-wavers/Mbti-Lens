import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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

  @Column({ unique: true })
  email!: string;

  @Column()
  nickname!: string;

  @Column()
  phone_number!: string;
}
