import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Seat } from '../theater/seat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar')
  username: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  nickname: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  email: string;

  @Column('varchar')
  password: string;

  @OneToMany(() => Seat, seat => seat.user)
  bookedSeats: Seat[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
