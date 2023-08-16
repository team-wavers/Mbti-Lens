import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Mbti {
  @PrimaryGeneratedColumn()
  _id: number;

  @Column()
  userId: number;

  @Column()
  mbti: string;

  @Column('text', { array: true, nullable: true })
  EI: string[];

  @Column('text', { array: true, nullable: true })
  NS: string[];

  @Column('text', { array: true, nullable: true })
  TF: string[];

  @Column('text', { array: true, nullable: true })
  PJ: string[];
}
