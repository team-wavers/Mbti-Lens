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

  @Column()
  userid!: string;

  @Column()
  nickname!: string;

  @Column({ nullable: true })
  age?: string;

  @Column({ nullable: true })
  gender?: string;

  @Column()
  public_key!: string;
}
